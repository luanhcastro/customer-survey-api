import { Survey } from '../entities/Survey';

export interface SurveyRepository {
  create(survey: Survey): Promise<void>;
  update(survey: Survey): Promise<void>;
  findById(id: string): Promise<Survey | null>;
  listByNiche(nicheId: string, orderBy: 'asc' | 'desc'): Promise<Survey[]>;
}