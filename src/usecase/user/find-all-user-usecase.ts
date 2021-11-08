import { User } from 'src/domain/user/User';
import { IUserRepository } from 'src/domain/user/__interface__/user-repository-interface';
import { UserOutputDto } from './__dto__/user-output-dto';

export class FindAllUserUsecase {
  public constructor(readonly repository: IUserRepository) {}

  public async do(): Promise<UserOutputDto[]> {
    const allUser: User[] = await this.repository.findAll();
    return allUser.map((one: User) => new UserOutputDto(one));
  }
}
