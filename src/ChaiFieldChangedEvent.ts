
export class ChaiFieldChangedEvent<T> extends Event {
  public get field(): string {
    return this._field;
  }
  public get value(): T {
    return this._value;
  }

  constructor(private _field: string, private _value: T) {
    super('chai-fieldchanged', {
      bubbles: false,
      cancelable: false,
      composed: true
    });
  }
}
