import { Visitor } from '../../../app/entities/visitor';

export class VisitorPresenter {
  static toHTTP(visitor: Visitor) {
    return {
      id: visitor.id,
      name: visitor.name,
      document: visitor.document,
      dateOfBirth: visitor.dateOfBirth,
      photo: visitor.photo,
      priorityLevelId: visitor.priorityLevelId,
    };
  }
}
