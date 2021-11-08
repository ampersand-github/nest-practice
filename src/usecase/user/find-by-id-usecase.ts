import { User } from 'src/domain/user/User';
import { UserId } from 'src/domain/user/user-id';
import { IUserRepository } from 'src/domain/user/__interface__/user-repository-interface';
import { UserOutputDto } from './__dto__/user-output-dto';

export class FindByIdUsecase {
  public constructor(readonly repository: IUserRepository) {}

  public async do(id: string): Promise<UserOutputDto> {
    const user: User = await this.repository.findById(UserId.restore(id));
    return new UserOutputDto(user);
  }
}
