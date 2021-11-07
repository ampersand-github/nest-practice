import { IPostProps, Post } from '../post';
import { PostId } from '../Post-id';

const postProps: IPostProps = {
  title: 'タイトル',
  content: 'コンテンツ',
  published: true,
};

describe('Post', () => {
  it('createできる', () => {
    expect(Post.create(postProps)).toEqual(expect.any(Post));
  });

  it('restoreできる', () => {
    expect(Post.restore(postProps, PostId.restore('test-id'))).toEqual(
      expect.any(Post),
    );
    expect(Post.restore(postProps, PostId.restore('test-id')).id).toEqual(
      PostId.restore('test-id'),
    );
  });
});
