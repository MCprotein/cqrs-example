import { CreatePostDto, PostDto, UpdatePostDto } from './post.dto'

export interface PostRepositoryPort {
  createOne(post: CreatePostDto): void
  findOneById(id: string): Promise<PostDto>
  updateOneById(id: string, data: UpdatePostDto): Promise<void>
}

export const PostRepositoryMysql = 'post-mysql'
