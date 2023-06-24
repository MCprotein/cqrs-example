export class SignUpCommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly name: string,
    public readonly nickname: string,
    public readonly email: string
  ) {}
}
