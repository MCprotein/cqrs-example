export class UpdatePostEvent {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly userId: string
  ) {}
}

export class ComsumeUpdatePostEvent {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly userId: string
  ) {}
}
