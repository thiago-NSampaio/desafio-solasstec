export interface Availability {
  dayOfWeek: string;
  openTime: string;
  closeTime: string;
}

export class Room {
  private readonly _name: string;
  private readonly _availability: Availability[];
  private readonly _capacity: number;
  private readonly _capacityVariation: number | null;

  constructor(
    name: string,
    availability: Availability[],
    capacity: number,
    capacityVariation?: number | null,
  ) {
    this._name = name;
    this._availability = availability;
    this._capacity = capacity;
    this._capacityVariation = capacityVariation ?? null;
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
}
