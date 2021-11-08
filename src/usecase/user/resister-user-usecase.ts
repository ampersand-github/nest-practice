import { User } from 'src/domain/user/User';
import { IUserDomain } from 'src/domain/user/__interface__/user-domain-interface';
import { IUserRepository } from 'src/domain/user/__interface__/user-repository-interface';
import { ResisterUserInputDto } from 'src/presentation/controller/user/__dto__/resister-user-input-dto';
import { DisallowDuplicateEmailService } from '../../domain/user/__service__/disallow-duplicate-email-service';

export class ResisterUserUsecase {
  public constructor(readonly repository: IUserRepository) {}

  public async do(dto: ResisterUserInputDto): Promise<void> {
    const props: IUserDomain = {
      name: dto.name,
      email: dto.email,
    };
    const user = User.create(props);
    const service = new DisallowDuplicateEmailService(this.repository);
    await service.do(user);
    await this.repository.register(user);
  }
}
