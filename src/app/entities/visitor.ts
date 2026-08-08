import { randomUUID } from 'node:crypto';

export class Visitor {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _document: string;
  private readonly _dateOfBirth: Date;
  private readonly _photo: string | null;
  private readonly _priorityLevelId: number | null;

  constructor(
    name: string,
    document: string,
    dateOfBirth: Date,
    photo: string | null,
    priorityLevelId: number | null,
  ) {
    this._id = randomUUID();
    this._name = name;
    this._document = document;
    this._dateOfBirth = dateOfBirth;
    this._photo = photo;
    this._priorityLevelId = priorityLevelId;
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

  get priorityLevelId(): number | null {
    return this._priorityLevelId;
  }
}
