import { User } from 'src/domain/user/User';

export class UserOutputDto {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public constructor(user: User) {
    this.id = user.id.toString();
    this.name = user.name;
    this.email = user.email;
  }
}
