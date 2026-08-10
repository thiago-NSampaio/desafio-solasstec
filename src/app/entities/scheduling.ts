import { randomUUID } from 'node:crypto';
import { Room } from './room';
import { Visitor } from './visitor';

export class Scheduling {
  private readonly _id: string;
  private _visitorId: string;
  private _roomId: string | null;
  private _dateScheduled: Date;
  private readonly _active: boolean | null;
  private readonly _createdAt: Date | null;
  private readonly _visitor?: Visitor | null;
  private readonly _room?: Room | null;

  constructor(
    visitorId: string,
    dateScheduled: Date,
    roomId: string | null,
    active?: boolean | null,
    createdAt?: Date | null,
    visitor?: Visitor | null,
    room?: Room | null,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this._visitorId = visitorId;
    this._dateScheduled = dateScheduled;
    this._roomId = roomId;
    this._active = active ?? true;
    this._createdAt = createdAt ?? new Date();
    this._visitor = visitor;
    this._room = room;
  }

  updateDetails(
    dateScheduled?: Date,
    roomId?: string | null,
    visitorId?: string,
  ) {
    if (dateScheduled !== undefined) {
      this._dateScheduled = dateScheduled;
    }
    if (roomId !== undefined) {
      this._roomId = roomId;
    }
    if (visitorId !== undefined) {
      this._visitorId = visitorId;
    }
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

  get endTime(): Date | null {
    if (!this._dateScheduled || !this._room || !this._room.availability?.length) {
      return null;
    }

    const endTime = new Date(this._dateScheduled);

    return endTime;
  }

  get dateScheduled(): Date {
    return this._dateScheduled;
  }

  get active(): boolean | null {
    return this._active;
  }

  get createdAt(): Date | null {
    return this._createdAt;
  }

  get visitor(): Visitor | null {
    return this._visitor || null;
  }

  get room(): Room | null {
    return this._room || null;
  }
}

