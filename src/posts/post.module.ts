import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostHandler, GetPostHandler } from './post.handler'

@Module({
  providers: [PostService, CreatePostHandler, GetPostHandler]
})
export class PostModule {}
