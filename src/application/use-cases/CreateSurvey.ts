
import { SurveyRepository } from '../../domain/repositories/SurveyRepository';
import { NicheRepository } from '../../domain/repositories/NicheRepository';
import { NicheQuestionRepository } from '../../domain/repositories/NicheQuestionRepository';

interface CreateSurveyRequest {
  nicheId: string;
  stars: number;
  email: string;
  nicheAnswers: { [key: string]: string };
}

export class CreateSurvey {
  constructor(
    private surveyRepository: SurveyRepository,
    private nicheRepository: NicheRepository,
    private nicheQuestionRepository: NicheQuestionRepository
  ) {}

  async execute(request: CreateSurveyRequest) {
    const { nicheId, stars, email, nicheAnswers } = request;

    const niche = await this.nicheRepository.findById(nicheId);
    if (!niche) {
      throw new Error('Niche not found');
    }

    const survey = {
      id: '',
      nicheId,
      stars,
      email,
      nicheAnswers,
      created: new Date(),
      updated: new Date(),
    };

    await this.surveyRepository.create(survey);
  }
}