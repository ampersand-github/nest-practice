import { User } from 'src/domain/user/User';
import { IUserDomain } from 'src/domain/user/__interface__/user-domain-interface';
import { IUserRepository } from 'src/domain/user/__interface__/user-repository-interface';
import { ResisterUserInputDto } from 'src/presentation/controller/user/__dto__/resister-user-input-dto';
import { DisallowDuplicateEmailService } from '../../domain/user/__service__/disallow-duplicate-email-service';
import { UserId } from '../../domain/user/user-id';
import { DisallowNotExistIdService } from 'src/domain/user/__service__/disallow-not-exist-id-service';

export class UpdateUserUsecase {
  public constructor(readonly repository: IUserRepository) {}

  public async do(dto: ResisterUserInputDto, id: string): Promise<void> {
    const props: IUserDomain = {
      name: dto.name,
      email: dto.email,
    };
    const user = User.restore(props, UserId.restore(id));

    const disallowDuplicateEmailService = new DisallowDuplicateEmailService(
      this.repository,
    );
    const disallowNotExistIdService = new DisallowNotExistIdService(
      this.repository,
    );
    await disallowDuplicateEmailService.do(user);
    await disallowNotExistIdService.do(id);
    await this.repository.update(user);
  }
}
