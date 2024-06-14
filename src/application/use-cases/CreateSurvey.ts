
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

    if (stars < 1 || stars > 5) throw new Error('Stars must be from 1 to 5')

    const nicheQuestions = await this.nicheQuestionRepository.findManyByNiche(nicheId);

    Object.keys(nicheAnswers).forEach(nicheAnswerId => {
      if (!nicheQuestions?.some(nicheQuestion => nicheQuestion.id === nicheAnswerId))
        throw new Error(`Question ${nicheAnswerId} doesn't exists`)
      })

    const survey = {
      nicheId,
      stars,
      email,
      nicheAnswers,
    };

    await this.surveyRepository.create(survey);
  }
}