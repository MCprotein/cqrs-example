import {
  CommandHandler,
  EventsHandler,
  ICommandHandler,
  IEventHandler,
  IQueryHandler,
  QueryHandler
} from '@nestjs/cqrs'
import { CreatePostCommand } from './post.command'
import { GetPostQuery } from './post.query'
import { PostRepositoryMysql, PostRepositoryPort } from './post.repository.port'
import { Inject } from '@nestjs/common'
import { ComsumeUpdatePostEvent, UpdatePostEvent } from './post.event'
import { ClientKafka } from '@nestjs/microservices'

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(@Inject(PostRepositoryMysql) private readonly postRepository: PostRepositoryPort) {}

  async execute(command: CreatePostCommand) {
    const { userId, title, content } = command
    const createdAt = new Date()
    return this.postRepository.createOne({ userId, title, content, createdAt })
  }
}

@QueryHandler(GetPostQuery)
export class GetPostHandler implements IQueryHandler<GetPostQuery> {
  constructor(@Inject(PostRepositoryMysql) private readonly postRepository: PostRepositoryPort) {}

  async execute(query: GetPostQuery) {
    const { id } = query
    return await this.postRepository.findOneById(id)
  }
}

@EventsHandler(UpdatePostEvent)
export class UpdatePostHandler implements IEventHandler<UpdatePostEvent> {
  constructor(@Inject('NestJS-Module') private readonly clientKafka: ClientKafka) {}

  handle(event: UpdatePostEvent) {
    this.clientKafka.emit('post', event)
  }
}

@EventsHandler(ComsumeUpdatePostEvent)
export class ComsumeUpdatePostHandler implements IEventHandler<ComsumeUpdatePostEvent> {
  constructor(@Inject(PostRepositoryMysql) private readonly postRepository: PostRepositoryPort) {}

  async handle({ id, ...updateData }: ComsumeUpdatePostEvent) {
    const data = {
      ...updateData,
      updatedAt: new Date()
    }
    await this.postRepository.updateOneById(id, data)
  }
}
