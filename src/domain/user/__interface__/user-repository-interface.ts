import { User } from '../User';
import { UserId } from '../User-id';

export interface IUserRepository {
  findById(userId: UserId): Promise<User | null>;
  findAll(): Promise<User[]>;
  register(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(user: User): Promise<void>;
}
