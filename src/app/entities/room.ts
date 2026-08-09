import { randomUUID } from 'node:crypto';

export interface Availability {
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
}

export class Room {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _availability: Availability[];
  private readonly _capacity: number;
  private readonly _capacityVariation: number | null;
  private readonly _active: boolean | null;
  private readonly _createdAt: Date | null;

  constructor(
    name: string,
    availability: Availability[],
    capacity: number,
    capacityVariation?: number | null,
    active?: boolean | null,
    createdAt?: Date | null,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this._name = name;
    this._availability = availability;
    this._capacity = capacity;
    this._capacityVariation = capacityVariation ?? null;
    this._active = active ?? true;
    this._createdAt = createdAt ?? new Date();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get availability(): Availability[] {
    return this._availability;
  }

  get capacity(): number {
    return this._capacity;
  }

  get capacityVariation(): number | null {
    return this._capacityVariation;
  }

  get active(): boolean | null {
    return this._active;
  }

  get createdAt(): Date | null {
    return this._createdAt;
  }
}

