export class SampleCounter {
  private _count = 0;

  constructor() {}

  public get count() {
    return this._count;
  }

  public countup() {
    this._count = this._count + 1;
  }
}
