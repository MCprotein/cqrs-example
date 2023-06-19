export class BaseDto {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export class PostDto extends BaseDto {
  id: string
  content: string
  title: string
  userId: string
}

export class CreatePostDto {
  content: string
  title: string
  userId: string
  createdAt: Date
}
