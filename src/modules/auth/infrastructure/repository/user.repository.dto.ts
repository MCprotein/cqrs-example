export class CreateUserHandlerDto {
  username: string
  password: string
  name: string
  nickname: string
  email: string
  createdAt: Date
  isApproved: 'Y' | 'N'
}

export class BaseDto {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export class UserDto extends BaseDto {
  id: string
  username: string
  password: string
  name: string
  nickname: string
  email: string
  isApproved: 'Y' | 'N'
}
