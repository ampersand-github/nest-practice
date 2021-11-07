import { v4 as uuid } from 'uuid';
import { UniqueEntityId } from '../__shared__/unique-entity-id';

export class PostId extends UniqueEntityId {
  private constructor(value: string) {
    super(value, 'PostId');
  }

  public static create(): PostId {
    return new PostId(uuid());
  }

  public static restore(id: string): PostId {
    return new PostId(id);
  }
}
