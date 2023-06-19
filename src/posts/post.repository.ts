import { PrismaService } from 'prisma/prisma.service'
import { PostRepositoryPort } from './post.repository.port'
import { CreatePostDto, PostDto } from './post.dto'

export class PostRepository implements PostRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(post: CreatePostDto): Promise<void> {
    await this.prisma.post.create({ data: post })
  }

  async findOneById(id: string): Promise<PostDto> {
    return await this.prisma.post.findUnique({ where: { id } })
  }
}
