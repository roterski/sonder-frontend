import { User } from './user.model';

export class Post {
  constructor() {
    this.title = '';
    this.body = '';
  }

  public id: number;
  public title: string;
  public body: string;
  public author: User;
  public points: number;
  public voted: number;
  public commentCount: number;
}
