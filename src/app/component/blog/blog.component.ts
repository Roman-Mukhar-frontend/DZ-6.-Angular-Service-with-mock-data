import { Component, OnInit } from '@angular/core';
import { IPost, IUser } from 'src/app/shared/interfaces/blog.interface';
import { BlogserviceService } from 'src/app/shared/services/blogservice.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public usersPostsArr!: IPost[];
  public usersArr!: IUser[];
  public topic!: string;
  public message!: string;
  public editStatus = false;
  public editID!: number;
  public emailSignIn!: string;
  public passwordSignIn!: string;
  public checkDataSignIn!: boolean;
  public signInStatus = false;
  public adminStatus = false;
  public userName = '';
  public userNameToCheck = '';
  public userNameSignUp!: string;
  public emailSignUp!: string;
  public passwordSignUp!: string;
  public checkUsernameSignUp!: boolean;
  public checkEmailSignUp!: boolean;
  public regExpEmail = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{1,5}/;

  constructor(
    private blogservice: BlogserviceService

  ) { }

  ngOnInit(): void {
    this.getUsersPostArr();
    this.getUsersArr();
  }

  getUsersPostArr(): void {
    this.usersPostsArr = this.blogservice.getPostsArr();
  }
  getUsersArr(): void {
    this.usersArr = this.blogservice.getUsersArr();
  }

  addPost(): void {
    const newPost = {
      id: 1,
      topic: this.topic,
      postedBy: this.userName,
      message: this.message,
      date: new Date()
    };
    if (this.usersPostsArr.length > 0) {
      const id = this.usersPostsArr.slice(-1)[0].id;
      newPost.id = id + 1;
    }
    this.blogservice.addPost(newPost);
    this.resetForms();
  }

  editPost(post: IPost): void {
    this.resetForms();
    this.editStatus = true;
    this.topic = post.topic;
    this.message = post.message;
    this.editID = post.id;
  }

  deletePost(post: IPost): void {
    if (confirm('Do you want to delete this post?')) {
      this.blogservice.deletePost(post.id)
    }
  }

  savePost(): void {
    const updatePost = {
      id: this.editID,
      topic: this.topic,
      postedBy: this.userName,
      message: this.message,
      date: new Date()
    };
    this.blogservice.updatePost(updatePost, this.editID);
    this.resetForms();
    this.editStatus = false;
  }

  closeModal(): void {
    this.resetForms();
  }

  signIn(): void {
    this.userName = this.userNameToCheck;
    this.signInStatus = true;
    this.resetForms();
    this.checkDataSignIn = false;
  }
  signOut(): void {
    this.signInStatus = false;
    this.userName = '';
    this.checkDataSignIn = false;

  }

  private resetForms(): void {
    this.topic = '';
    this.message = '';
    this.editStatus = false;
    this.emailSignIn = '';
    this.passwordSignIn = '';
    this.userNameSignUp = '';
    this.emailSignUp = '';
    this.passwordSignUp = '';
  }

  checkDataToSignIn(): void {
    this.checkDataSignIn = false;
    for (const user of this.usersArr) {
      if (user.email === this.emailSignIn && user.password === this.passwordSignIn) {
        this.checkDataSignIn = true;
        this.userNameToCheck = user.username;
      }
    }
  }

  checkUsernameToSignUp(): void {
    for (const user of this.usersArr) {
      if (user.username === this.userNameSignUp) {
        this.checkUsernameSignUp = false;
      }
      else { this.checkUsernameSignUp = true }
    }
  }

  checkEmailToSignUp(): void {
    if (this.regExpEmail.test(this.emailSignUp)) {
      for (const user of this.usersArr) {
        if (user.email === this.emailSignUp) {
          this.checkEmailSignUp = false;
        }
        else { this.checkEmailSignUp = true }
      }
    }
  }
  
  addNewUser(): void {
    const newUser = {
      id: this.usersArr.length + 1,
      username: this.userNameSignUp,
      email: this.emailSignUp,
      password: this.passwordSignUp
    };
    this.blogservice.addUser(newUser);
    this.resetForms();
    this.userName = newUser.username;
    this.signInStatus = true;
  }

}
