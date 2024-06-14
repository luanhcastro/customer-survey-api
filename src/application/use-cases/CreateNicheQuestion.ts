import { NicheQuestionRepository } from '../../domain/repositories/NicheQuestionRepository';
import { NicheRepository } from '../../domain/repositories/NicheRepository';

interface CreateNicheQuestionRequest {
  key: string;
  label: string;
  niches: string[];
}

export class CreateNicheQuestion {
  constructor(
    private nicheQuestionRepository: NicheQuestionRepository,
    private nicheRepository: NicheRepository
  ) {}

  async execute(request: CreateNicheQuestionRequest) {
    const { key, label, niches } = request;

    if (!key) throw new Error('Key is required');
    if (!label) throw new Error('Label is required');
    if (!niches || niches.length === 0) throw new Error('At least one niche is required');

    const existingNiches = await this.nicheRepository.findAll();
    const existingNicheKeys = existingNiches?.map(niche => niche.key);

    niches.forEach(niche => {
      if (!existingNicheKeys?.includes(niche)) {
        throw new Error(`Niche ${niche} does not exist`);
      }
    });

    const nicheQuestion = {
      key,
      label,
      niches,
      deleted: null,
    };

    await this.nicheQuestionRepository.create(nicheQuestion);
  }
}
