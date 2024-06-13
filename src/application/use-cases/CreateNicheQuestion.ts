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
      id: '',
      key,
      label,
      niches,
      created: new Date(),
      deleted: null,
    };

    await this.nicheQuestionRepository.create(nicheQuestion);
  }
}
