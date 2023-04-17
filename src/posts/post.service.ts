import { Injectable } from '@nestjs/common'

export interface Post {
  title: string
  content: string
  id?: number
}

@Injectable()
export class PostService {
  private readonly posts: Post[] = []

  create(post: Post): Post {
    const id = Math.floor(Math.random() * 10000)
    post.id = id
    this.posts.push(post)
    return post
  }

  findById(id: number): Post {
    return this.posts.find((post) => post.id === id)
  }
}
