import { PostId } from './Post-id';
import { AggregateRoot } from '../__shared__/aggregate-root';
import { IPostDomain } from './__interface__/post-domain-interface';

export class Post extends AggregateRoot<IPostDomain, PostId> {
  public static create(props: IPostDomain): Post {
    return new Post(props, PostId.create());
  }

  public static restore(props: IPostDomain, id: PostId): Post {
    return new Post(props, id);
  }
  public get title(): string {
    return this.props.title;
  }

  public get content(): string {
    return this.props.content;
  }

  public get published(): boolean {
    return this.props.published;
  }
}
