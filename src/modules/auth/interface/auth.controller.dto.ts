export class BaseDto {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

// export class UserDto extends BaseDto {
//   id: string
//   username: string
//   password: string
//   name: string
//   nickname: string
//   email: string
//   isApproved: IsApprovedType
// }

export class SignUpControllerDto {
  username: string
  password: string
  name: string
  nickname: string
  email: string
}

export class SignInControllerDto {
  email: string
  password: string
}

// export class CreateUserHandlerDto {
//   username: string
//   password: string
//   name: string
//   nickname: string
//   email: string
//   createdAt: Date
//   isApproved: IsApprovedType
// }
