import { randomUUID } from 'node:crypto';
import { Room } from './room';
import { Scheduling } from './scheduling';
import { Visitor } from './visitor';

export class Entry {
  private readonly _id: string;
  private readonly _visitorId: string;
  private readonly _roomId: string | null;
  private readonly _schedulingId: string | null;
  private readonly _enteredAt: Date | null;
  private readonly _exitedAt: Date | null;
  private readonly _active: boolean | null;
  private readonly _createdAt: Date | null;
  private readonly _visitor?: Visitor | null;
  private readonly _room?: Room | null;
  private readonly _scheduling?: Scheduling | null;

  constructor(
    visitorId: string,
    roomId?: string | null,
    schedulingId?: string | null,
    enteredAt?: Date | null,
    exitedAt?: Date | null,
    active?: boolean | null,
    createdAt?: Date | null,
    visitor?: Visitor | null,
    room?: Room | null,
    scheduling?: Scheduling | null,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this._visitorId = visitorId;
    this._roomId = roomId ?? null;
    this._schedulingId = schedulingId ?? null;
    this._enteredAt = enteredAt ?? new Date();
    this._exitedAt = exitedAt ?? null;
    this._active = active ?? true;
    this._createdAt = createdAt ?? new Date();
    this._visitor = visitor ?? null;
    this._room = room ?? null;
    this._scheduling = scheduling ?? null;
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

  get schedulingId(): string | null {
    return this._schedulingId;
  }

  get enteredAt(): Date | null {
    return this._enteredAt;
  }

  get exitedAt(): Date | null {
    return this._exitedAt;
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

  get scheduling(): Scheduling | null {
    return this._scheduling || null;
  }
}
