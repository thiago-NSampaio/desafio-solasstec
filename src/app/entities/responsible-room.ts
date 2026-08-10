import { randomUUID } from 'node:crypto';
import { Room } from './room';

export class ResponsibleRoom {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _roomId: string | null;
  private readonly _validFrom: Date;
  private readonly _validTo: Date | null;
  private readonly _active: boolean | null;
  private readonly _createdAt: Date | null;
  private readonly _room?: Room | null;

  constructor(
    name: string,
    roomId: string | null,
    validFrom: Date,
    validTo?: Date | null,
    active?: boolean | null,
    createdAt?: Date | null,
    room?: Room | null,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this._name = name;
    this._roomId = roomId;
    this._validFrom = validFrom;
    this._validTo = validTo ?? null;
    this._active = active ?? true;
    this._createdAt = createdAt ?? new Date();
    this._room = room ?? null;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get roomId(): string | null {
    return this._roomId;
  }

  get validFrom(): Date {
    return this._validFrom;
  }

  get validTo(): Date | null {
    return this._validTo;
  }

  get active(): boolean | null {
    return this._active;
  }

  get createdAt(): Date | null {
    return this._createdAt;
  }

  get room(): Room | null {
    return this._room || null;
  }
}
