import { SurveyRepository } from '../../domain/repositories/SurveyRepository';

interface ListSurveyAnswersRequest {
  nicheId: string;
  orderBy: 'asc' | 'desc';
}

export class ListSurveyAnswers {
  constructor(private surveyRepository: SurveyRepository) {}

  async execute(request: ListSurveyAnswersRequest) {
    const { nicheId, orderBy } = request;

    return await this.surveyRepository.listByNiche(nicheId, orderBy);
  }
}