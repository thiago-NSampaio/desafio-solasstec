import { Injectable } from '@nestjs/common';
import { ResponsibleRoom } from '../entities/responsible-room';
import { ResponsibleRoomRepository } from '../repositories/responsible-room-repository';

interface GetRoomResponsiblesRequest {
  roomId: string;
}

interface GetRoomResponsiblesResponse {
  responsibles: ResponsibleRoom[];
}

@Injectable()
export class GetRoomResponsibles {
  constructor(private responsibleRoomRepository: ResponsibleRoomRepository) {}

  async execute(
    request: GetRoomResponsiblesRequest,
  ): Promise<GetRoomResponsiblesResponse> {
    const responsibles = await this.responsibleRoomRepository.findManyByRoomId(
      request.roomId,
    );

    return { responsibles };
  }
}
