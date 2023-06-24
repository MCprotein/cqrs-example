import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { UserRepositoryPort } from './user.repository.port'
import { CreateUserHandlerDto, UserDto } from '../../dto/user.dto'

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(data: CreateUserHandlerDto): Promise<void> {
    await this.prisma.user.create({ data })
  }

  async findOneByEmail(email: string): Promise<UserDto> {
    return await this.prisma.user.findUniqueOrThrow({ where: { email } })
  }
}
