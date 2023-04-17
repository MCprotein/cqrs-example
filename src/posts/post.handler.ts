import { CommandHandler, ICommandHandler, IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { CreatePostCommand } from './post.command'
import { PostService } from './post.service'
import { GetPostQuery } from './post.query'

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(private readonly postService: PostService) {}

  async execute(command: CreatePostCommand) {
    const { title, content } = command
    return await this.postService.create({ title, content })
  }
}

@QueryHandler(GetPostQuery)
export class GetPostHandler implements IQueryHandler<GetPostQuery> {
  constructor(private readonly postService: PostService) {}

  async execute(query: GetPostQuery) {
    const { id } = query
    return await this.postService.findById(id)
  }
}
