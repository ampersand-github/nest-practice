import { User } from '../User';
import { IUserRepository } from '../__interface__/user-repository-interface';
import { UserId } from '../user-id';

export class DisallowNotExistIdService {
  public constructor(public readonly userRepository: IUserRepository) {}

  public async do(userId: string): Promise<void> {
    /*
    ユーザーのuidが重複していたらエラーを出力する
    */
    const targetId = UserId.restore(userId);
    const allUser: User[] = await this.userRepository.findAll();
    const result = allUser.filter((one: User) => one.id.equals(targetId));
    if (result.length === 0) {
      throw new Error('このユーザーは存在していません。');
    }
  }
}
