export class Scheduling {
  private readonly _visitorId: number;
  private readonly _roomId: number | null;
  private readonly _dateScheduled: Date;

  constructor(visitorId: number, dateScheduled: Date, roomId: number | null) {
    this._visitorId = visitorId;
    this._dateScheduled = dateScheduled;
    this._roomId = roomId;
  }

  get visitorId(): number {
    return this._visitorId;
  }

  get roomId(): number | null {
    return this._roomId;
  }

  get dateScheduled(): Date {
    return this._dateScheduled;
  }
}
