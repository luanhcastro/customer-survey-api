import { NicheQuestionRepository } from '../../domain/repositories/NicheQuestionRepository';

interface UpdateNicheQuestionNichesRequest {
  id: string;
  niches: string[];
}

export class UpdateNicheQuestionNiches {
  constructor(private nicheQuestionRepository: NicheQuestionRepository) {}

  async execute(request: UpdateNicheQuestionNichesRequest) {
    const { id, niches } = request;

    const nicheQuestion = await this.nicheQuestionRepository.findById(id);
    if (!nicheQuestion) {
      throw new Error('Niche question not found');
    }

    nicheQuestion.niches = niches;
    nicheQuestion.created = new Date();

    await this.nicheQuestionRepository.update(nicheQuestion);
  }
}

// src/application/use-cases/UpdateSurvey.ts
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