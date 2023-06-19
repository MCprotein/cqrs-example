import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreatePostCommand } from './post.command'
import { GetPostQuery } from './post.query'

@Controller('posts')
export class PostController {
  constructor(private readonly commandBus: CommandBus, public readonly queryBus: QueryBus) {}

  @Post()
  async createPost(@Body() body: { title: string; content: string }) {
    const { title, content } = body
    const userId = 'user'
    const command = new CreatePostCommand(userId, title, content)
    return await this.commandBus.execute(command)
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    const query = new GetPostQuery(id)
    return await this.queryBus.execute(query)
  }
}
