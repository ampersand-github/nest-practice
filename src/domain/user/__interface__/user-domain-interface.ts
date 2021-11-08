import { Post } from 'src/domain/post/post';

export interface IUserDomain {
  name: string;
  email: string;
  posts?: Post[];
}
