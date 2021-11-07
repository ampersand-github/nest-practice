import { PostId } from './Post-id';
import { AggregateRoot } from '../__shared__/aggregate-root';

export interface IPostProps {
  title: string;
  content: string;
  published: boolean;
}

export class Post extends AggregateRoot<IPostProps, PostId> {
  public static create(props: IPostProps): Post {
    return new Post(props, PostId.create());
  }

  public static restore(props: IPostProps, id: PostId): Post {
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
