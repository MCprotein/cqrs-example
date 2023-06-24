import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { AuthRepositoryPort } from './auth.repository.port'
import { CreateUserRepositoryDto, UserDto } from './auth.repository.dto'

@Injectable()
export class AuthRepository implements AuthRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(data: CreateUserRepositoryDto): Promise<void> {
    await this.prisma.user.create({ data })
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    return await this.prisma.user.findUniqueOrThrow({ where: { email } })
  }
}
