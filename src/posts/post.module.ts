import { Module } from '@nestjs/common'
import { CreatePostHandler, GetPostHandler } from './post.handler'
import { PostController } from './post.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { PrismaModule } from 'prisma/prisma.module'
import { PostRepository } from './post.repository'
import { PostRepositoryMysql } from './post.repository.port'

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [PostController],
  providers: [
    CreatePostHandler,
    GetPostHandler,
    PostRepository,
    { provide: PostRepositoryMysql, useClass: PostRepository }
  ]
})
export class PostModule {}
