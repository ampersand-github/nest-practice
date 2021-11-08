import { Post } from '../post';
import { PostId } from '../Post-id';

export interface IPostRepository {
  findById(id: PostId): Promise<Post | null>;
  findAll(): Promise<void>;
  register(post: Post): Promise<void>;
  update(post: Post): Promise<void>;
  delete(post: Post): Promise<void>;
}
