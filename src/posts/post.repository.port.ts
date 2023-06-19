import { CreatePostDto, PostDto } from './post.dto'

export interface PostRepositoryPort {
  createOne(post: CreatePostDto): void
  findOneById(id: string): Promise<PostDto>
}

export const PostRepositoryMysql = 'post-mysql'
