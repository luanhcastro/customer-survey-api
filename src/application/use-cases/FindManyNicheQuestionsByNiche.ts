import { NicheQuestionRepository } from '../../domain/repositories/NicheQuestionRepository';
import { NicheRepository } from '../../domain/repositories/NicheRepository';

export class FindManyByNiche {
  constructor(private nicheQuestionRepository: NicheQuestionRepository,
              private nicheRepository: NicheRepository
  ) {}

  async execute(nicheId: string) {
    const niche = await this.nicheRepository.findById(nicheId);
    if (!niche) {
      throw new Error('Niche not found');
    }
    return await this.nicheQuestionRepository.findManyByNiche(nicheId);
  }
}