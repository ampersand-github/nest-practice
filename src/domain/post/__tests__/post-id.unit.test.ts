import { PostId } from '../Post-id';

describe('PostId', () => {
  it('createできる', () => {
    expect(PostId.create()).toEqual(expect.any(PostId));
  });

  it('restoreできる', () => {
    expect(PostId.restore('test-id')).toEqual(expect.any(PostId));
  });

  it('toStringできる', () => {
    expect(PostId.restore('test-id').toString()).toEqual('test-id');
  });

  it('equalsできる', () => {
    expect(PostId.restore('test-id').equals(PostId.restore('test-id'))).toBe(
      true,
    );
    expect(
      PostId.restore('test-id').equals(PostId.restore('not-equal-id')),
    ).toBe(false);
  });
});
