import { SurveyRepository } from '../../domain/repositories/SurveyRepository';

interface AnswerSurveyRequest {
  id: string;
  answers: { [key: string]: string };
}

export class AnswerSurvey {
  constructor(private surveyRepository: SurveyRepository) {}

  async execute(request: AnswerSurveyRequest) {
    const { id, answers } = request;

    const survey = await this.surveyRepository.findById(id);
    if (!survey) {
      throw new Error('Survey not found');
    }

    survey.nicheAnswers = { ...survey.nicheAnswers, ...answers };
    survey.updated = new Date();

    await this.surveyRepository.update(survey);
  }
}