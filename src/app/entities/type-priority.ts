import { randomUUID } from 'node:crypto';

export class TypePriority {
  private readonly _id: string;
  private readonly _description: string;
  private readonly _priorityLevel: number;
  private readonly _active: boolean | null;
  private readonly _createdAt: Date | null;

  constructor(
    description: string,
    priorityLevel: number,
    active?: boolean | null,
    createdAt?: Date | null,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this._description = description;
    this._priorityLevel = priorityLevel;
    this._active = active ?? true;
    this._createdAt = createdAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get description(): string {
    return this._description;
  }

  get priorityLevel(): number {
    return this._priorityLevel;
  }

  get active(): boolean | null {
    return this._active;
  }

  get createdAt(): Date | null {
    return this._createdAt;
  }
}
