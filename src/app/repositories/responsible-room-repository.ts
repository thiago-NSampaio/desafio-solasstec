import { ResponsibleRoom } from '../entities/responsible-room';

export abstract class ResponsibleRoomRepository {
  abstract create(responsibleRoom: ResponsibleRoom): Promise<ResponsibleRoom>;
  abstract findManyByRoomId(roomId: string): Promise<ResponsibleRoom[]>;
  abstract findCurrentByRoomId(roomId: string): Promise<ResponsibleRoom | null>;
  abstract closePreviousResponsible(
    roomId: string,
    validTo: Date,
  ): Promise<void>;
}
