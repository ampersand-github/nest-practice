import { Post } from 'src/domain/post/post';
import { User } from '../user';
import { UserId } from '../user-id';
import { IUserDomain } from '../__interface__/user-domain-interface';

const post1 = Post.create({
  title: 'タイトル',
  content: 'コンテンツ',
  published: true,
});
const post2 = Post.create({
  title: 'タイトル2',
  content: 'コンテンツ2',
  published: true,
});
const UserProps: IUserDomain = {
  name: '名前',
  email: 'aaa@example.com',
  posts: [post1, post2],
};

describe('User', () => {
  it('createできる', () => {
    expect(User.create(UserProps)).toEqual(expect.any(User));
  });

  it('restoreできる', () => {
    const userId: UserId = UserId.restore('test-id');
    expect(User.restore(UserProps, userId)).toEqual(expect.any(User));
    expect(User.restore(UserProps, userId).id.equals(userId)).toBe(true);
  });
});
