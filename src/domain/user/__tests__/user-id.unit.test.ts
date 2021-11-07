import { UserId } from '../user-id';
import { PostId } from '../../post/post-id';

describe('UserId', () => {
  it('createできる', () => {
    expect(UserId.create()).toEqual(expect.any(UserId));
  });

  it('restoreできる', () => {
    expect(UserId.restore('test-id')).toEqual(expect.any(UserId));
  });

  it('toStringできる', () => {
    expect(UserId.restore('test-id').toString()).toEqual('test-id');
  });

  it('equalsできる', () => {
    expect(UserId.restore('test-id').equals(UserId.restore('test-id'))).toBe(
      true,
    );
    expect(
      UserId.restore('test-id').equals(UserId.restore('not-equal-id')),
    ).toBe(false);
  });
  it('id(uuid)が同じだけどIDのクラスが違う', () => {
    const postId = PostId.restore('test-id');
    const userId = UserId.restore('test-id');
    expect(postId).not.toEqual(userId);
    expect(postId.equals(userId)).toBe(false);
  });
});
