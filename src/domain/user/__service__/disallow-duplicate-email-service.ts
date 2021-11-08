import { User } from '../User';
import { IUserRepository } from '../__interface__/user-repository-interface';

export class DisallowDuplicateEmailService {
  public constructor(public readonly userRepository: IUserRepository) {}

  public async do(user: User): Promise<void> {
    /*
    メールアドレスが重複していたらエラーを出力する
    */
    const allUser: User[] = await this.userRepository.findAll();
    const result = allUser.filter((one: User) => one.email === user.email);
    if (result.length !== 0) {
      throw new Error(
        '既に登録されているメールアドレスです。異なるメールアドレスを入力してください。',
      );
    }
  }
}
