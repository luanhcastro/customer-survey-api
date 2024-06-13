import { SurveyRepository } from '../../domain/repositories/SurveyRepository';

interface UpdateSurveyRequest {
  id: string;
  stars?: number;
  email?: string;
  nicheAnswers?: { [key: string]: string };
}

export class UpdateSurvey {
  constructor(private surveyRepository: SurveyRepository) {}

  async execute(request: UpdateSurveyRequest) {
    const { id, stars, email, nicheAnswers } = request;

    const survey = await this.surveyRepository.findById(id);
    if (!survey) {
      throw new Error('Survey not found');
    }

    if (stars !== undefined) survey.stars = stars;
    if (email !== undefined) survey.email = email;
    if (nicheAnswers !== undefined) survey.nicheAnswers = nicheAnswers;
    survey.updated = new Date();

    await this.surveyRepository.update(survey);
  }
}