import { Injectable } from '@angular/core';
import { IPost, IUser } from '../interfaces/blog.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogserviceService {

  private postsArr: Array<IPost> = [
    {
      id: 1,
      topic: 'First Post',
      postedBy: 'admin',
      message: 'Sign up to create your account and start to use Angular blog',
      date: new Date(2024, 1, 22, 14, 0)
    }
  ]

  private usersArr: Array<IUser> = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      password: 'admin'
    }
  ]

  constructor() { }

  getPostsArr(): Array<IPost> {
    return this.postsArr;
  }

  addPost(newPost: IPost): void {
    this.postsArr.push(newPost);
  }
  updatePost(newPost: IPost, id: number): void {
    const index = this.postsArr.findIndex(newPost => newPost.id === id);
    this.postsArr.splice(index, 1, newPost);
  }

  deletePost(id: number): void {
    const index = this.postsArr.findIndex(newPost => newPost.id === id);
    this.postsArr.splice(index, 1);
  }

  getUsersArr(): Array<IUser> {
    return this.usersArr;
  }

  addUser(newUser: IUser): void {
    this.usersArr.push(newUser);
  }
}
