import { randomUUID } from 'node:crypto';

export class Visitor {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _document: string;
  private readonly _dateOfBirth: Date;
  private readonly _photo: string | null;
  private readonly _priorityLevelId: string | null;
  private readonly _active: boolean | null;
  private readonly _createdAt: Date | null;

  constructor(
    name: string,
    document: string,
    dateOfBirth: Date,
    photo: string | null,
    priorityLevelId: string | null,
    active?: boolean | null,
    createdAt?: Date | null,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this._name = name;
    this._document = document;
    this._dateOfBirth = dateOfBirth;
    this._photo = photo;
    this._priorityLevelId = priorityLevelId;
    this._active = active ?? true;
    this._createdAt = createdAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get dateOfBirth(): Date {
    return this._dateOfBirth;
  }

  get photo(): string | null {
    return this._photo;
  }

  get priorityLevelId(): string | null {
    return this._priorityLevelId;
  }

  get active(): boolean | null {
    return this._active;
  }

  get createdAt(): Date | null {
    return this._createdAt;
  }

  get age(): number {
    const today = new Date();
    const birth = new Date(this._dateOfBirth);
    const age = today.getFullYear() - birth.getFullYear();

    return age;
  }

  isPriority(): boolean {
    return this.age >= 60 || Boolean(this._priorityLevelId);
  }
}
