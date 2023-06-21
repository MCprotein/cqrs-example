import { AggregateRoot } from '@nestjs/cqrs'

export interface IUserProperties {
  id: string
  username: string
  password: string
  name: string
  nickname: string
  email: string
  isApproved: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IUser {
  get getUser(): IUserProperties
  get getCreatedAt(): Date
  get getUpdatedAt(): Date
  get getDeletedAt(): Date
  get getIsApproved(): string
  set setCreatedAt(date: Date)
  set setUpdatedAt(date: Date)
  set setDeletedAt(date: Date)
  set setIsApproved(isApproved: string)
}

export class User extends AggregateRoot implements IUser {
  private id: string
  private username: string
  private password: string
  private name: string
  private nickname: string
  private email: string
  private isApproved: string
  private createdAt?: Date
  private updatedAt?: Date
  private deletedAt?: Date
  constructor(user: IUserProperties) {
    super()
    Object.assign(this, user)
  }

  get getUser(): IUserProperties {
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
  set setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt
  }
  set setUpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt
  }
  set setDeletedAt(deletedAt: Date) {
    this.deletedAt = deletedAt
  }
  set setIsApproved(isApproved: string) {
    this.isApproved = isApproved
  }
}
