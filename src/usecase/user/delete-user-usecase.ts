import { User } from 'src/domain/user/User';
import { UserId } from 'src/domain/user/user-id';
import { IUserRepository } from 'src/domain/user/__interface__/user-repository-interface';
import { DisallowNotExistIdService } from 'src/domain/user/__service__/disallow-not-exist-id-service';

export class DeleteUserUsecase {
  public constructor(readonly repository: IUserRepository) {}

  public async do(id: string): Promise<void> {
    const disallowNotExistIdService = new DisallowNotExistIdService(
      this.repository,
    );
    await disallowNotExistIdService.do(id);
    const user: User = await this.repository.findById(UserId.restore(id));
    await this.repository.delete(user);
  }
}
