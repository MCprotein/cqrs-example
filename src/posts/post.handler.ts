import { CommandHandler, ICommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { CreatePostCommand } from './post.command'
import { GetPostQuery } from './post.query'
import { PostRepositoryMysql, PostRepositoryPort } from './post.repository.port'
import { Inject } from '@nestjs/common'

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
