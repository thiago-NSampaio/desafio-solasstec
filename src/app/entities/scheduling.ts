import { randomUUID } from 'node:crypto';
import { Room } from './room';
import { Visitor } from './visitor';

export class Scheduling {
  private readonly _id: string;
  private readonly _visitorId: string;
  private readonly _roomId: string | null;
  private readonly _dateScheduled: Date;
  private readonly _visitor?: Visitor | null;
  private readonly _room?: Room | null;

  constructor(
    visitorId: string,
    dateScheduled: Date,
    roomId: string | null,
    visitor?: Visitor | null,
    room?: Room | null,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this._visitorId = visitorId;
    this._dateScheduled = dateScheduled;
    this._roomId = roomId;
    this._visitor = visitor;
    this._room = room;
  }

  get id(): string {
    return this._id;
  }

  get visitorId(): string {
    return this._visitorId;
  }

  get roomId(): string | null {
    return this._roomId;
  }

  get dateScheduled(): Date {
    return this._dateScheduled;
  }

  get visitor(): Visitor | null {
    return this._visitor || null;
  }

  get room(): Room | null {
    return this._room || null;
  }
}
