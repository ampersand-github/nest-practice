import { UserId } from './user-id';
import { Post } from '../post/post';
import { AggregateRoot } from '../__shared__/aggregate-root';
import { IUserDomain } from './__interface__/user-domain-interface';

export class User extends AggregateRoot<IUserDomain, UserId> {
  public static create(props: IUserDomain): User {
    return new User(props, UserId.create());
  }

  public static restore(props: IUserDomain, id: UserId): User {
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
