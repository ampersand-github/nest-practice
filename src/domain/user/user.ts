import { UserId } from './user-id';
import { Post } from '../post/post';
import { AggregateRoot } from '../__shared__/aggregate-root';

export interface IUserProps {
  name: string;
  email: string;
  posts?: Post[];
}

export class User extends AggregateRoot<IUserProps, UserId> {
  public static create(props: IUserProps): User {
    return new User(props, UserId.create());
  }

  public static restore(props: IUserProps, id: UserId): User {
    return new User(props, id);
  }
  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get posts(): Post[] {
    return this.props.posts;
  }
}
