export class UpdateUserInputDto {
  public constructor(
    public readonly name: string,
    public readonly email: string,
  ) {}
}
