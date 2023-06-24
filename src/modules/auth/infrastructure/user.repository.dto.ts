export class CreateUserHandlerDto {
  username: string
  password: string
  name: string
  nickname: string
  email: string
  createdAt: Date
  isApproved: 'Y' | 'N'
}
