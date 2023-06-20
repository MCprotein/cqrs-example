import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs'
import { CreatePostCommand } from './post.command'
import { GetPostQuery } from './post.query'
import { ComsumeUpdatePostEvent, UpdatePostEvent } from './post.event'
import { Ctx, EventPattern, KafkaContext, Payload, Transport } from '@nestjs/microservices'

@Controller('posts')
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus
  ) {}

  @Post()
  async createPost(@Body() body: { title: string; content: string }) {
    const { title, content } = body
    const userId = 'user'
    const command = new CreatePostCommand(userId, title, content)
    this.commandBus.execute(command)
  }

  @Get(':id')
  async getPost(@Param('id') id: string) {
    const query = new GetPostQuery(id)
    return await this.queryBus.execute(query)
  }

  @Patch(':id')
  async updatePost(@Param('id') id: string, @Body() body: { title: string; content: string }) {
    const { title, content } = body
    const userId = 'user'
    const event = new UpdatePostEvent(id, title, content, userId)
    this.eventBus.publish(event)
  }

  @EventPattern('post', Transport.KAFKA)
  consumeUpdatePost(@Payload() message: UpdatePostEvent, @Ctx() context: KafkaContext) {
    const { id, title, content, userId } = message
    const event = new ComsumeUpdatePostEvent(id, title, content, userId)
    this.eventBus.publish(event)
  }
}
