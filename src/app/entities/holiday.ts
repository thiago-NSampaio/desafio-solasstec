import { randomUUID } from 'node:crypto';

export class Holiday {
  private readonly _id: string;
  private readonly _date: Date;
  private readonly _description: string;
  private readonly _type: number | null;
  private readonly _active: boolean | null;
  private readonly _createdAt: Date | null;

  constructor(
    date: Date,
    description: string,
    type?: number | null,
    active?: boolean | null,
    createdAt?: Date | null,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this._date = date;
    this._description = description;
    this._type = type ?? null;
    this._active = active ?? true;
    this._createdAt = createdAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get date(): Date {
    return this._date;
  }

  get description(): string {
    return this._description;
  }

  get type(): number | null {
    return this._type;
  }

  get active(): boolean | null {
    return this._active;
  }

  get createdAt(): Date | null {
    return this._createdAt;
  }
}
