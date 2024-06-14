import { NicheQuestionRepository } from '../../domain/repositories/NicheQuestionRepository';

interface CreateNicheQuestionRequest {
  key: string;
  label: string;
  niches: string[];
}

export class CreateNicheQuestion {
  constructor(private nicheQuestionRepository: NicheQuestionRepository) {}

  async execute(request: CreateNicheQuestionRequest) {
    const { key, label, niches } = request;

    const nicheQuestion = {
      key,
      label,
      niches,
      deleted: null,
    };

    await this.nicheQuestionRepository.create(nicheQuestion);
  }
}
