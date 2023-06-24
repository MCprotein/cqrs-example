import { AggregateRoot } from '@nestjs/cqrs'

export type IsApprovedType = 'Y' | 'N'
export interface ISignUpProperties {
  username: string
  password: string
  name: string
  nickname: string
  email: string
}
export interface IAuthProperties {
  id?: string
  username: string
  password: string
  name: string
  nickname: string
  email: string
  isApproved: IsApprovedType
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IAuth {
  get getUserId(): string
  get getCreateUser(): Omit<IAuthProperties, 'id' | 'updatedAt' | 'deletedAt'>
  get getUser(): IAuthProperties
  get getCreatedAt(): Date
  get getUpdatedAt(): Date
  get getDeletedAt(): Date
  get getIsApproved(): string
  set setUserId(id: string)
  set setCreatedAt(date: Date)
  set setUpdatedAt(date: Date)
  set setDeletedAt(date: Date)
  set setIsApproved(isApproved: string)
}

export class Auth extends AggregateRoot implements IAuth {
  private id?: string
  private username: string
  private password: string
  private name: string
  private nickname: string
  private email: string
  private isApproved: IsApprovedType
  private createdAt: Date
  private updatedAt?: Date
  private deletedAt?: Date
  constructor(user: IAuthProperties) {
    super()
    Object.assign(this, user)
  }

  static create({ username, password, name, nickname, email }: ISignUpProperties): Auth {
    return new Auth({
      username,
      password,
      name,
      nickname,
      email,
      isApproved: 'N',
      createdAt: new Date()
    })
  }

  get getUserId(): string {
    return this.id
  }

  get getCreateUser(): Omit<IAuthProperties, 'id' | 'updatedAt' | 'deletedAt'> {
    return {
      username: this.username,
      password: this.password,
      name: this.name,
      nickname: this.nickname,
      email: this.email,
      isApproved: this.isApproved,
      createdAt: this.createdAt
    }
  }

  get getUser(): IAuthProperties {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      name: this.name,
      nickname: this.nickname,
      email: this.email,
      isApproved: this.isApproved,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
  get getCreatedAt(): Date {
    return this.createdAt
  }
  get getUpdatedAt(): Date {
    return this.updatedAt
  }
  get getDeletedAt(): Date {
    return this.deletedAt
  }
  get getIsApproved(): string {
    return this.isApproved
  }
  set setUserId(id: string) {
    this.id = id
  }
  set setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt
  }
  set setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt
  }
  set setDeletedAt(deletedAt: Date) {
    this.deletedAt = deletedAt
  }
  set setIsApproved(isApproved: IsApprovedType) {
    this.isApproved = isApproved
  }
}
