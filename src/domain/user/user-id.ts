import { v4 as uuid } from 'uuid';
import { UniqueEntityId } from '../__shared__/unique-entity-id';

export class UserId extends UniqueEntityId {
  private constructor(value: string) {
    super(value, 'UserId');
  }

  public static create(): UserId {
    return new UserId(uuid());
  }

  public static restore(id: string): UserId {
    return new UserId(id);
  }
}
