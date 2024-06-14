import { NicheQuestion } from '../entities/NicheQuestion';

export interface NicheQuestionRepository {
  findById(id: string): Promise<NicheQuestion | null>;
  findManyByNiche(nicheId: string): Promise<NicheQuestion[] | null>
  create(nicheQuestion: NicheQuestion): Promise<void>;
  update(nicheQuestion: NicheQuestion): Promise<void>;
}