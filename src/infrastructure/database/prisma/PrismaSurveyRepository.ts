import { PrismaClient } from '@prisma/client';
import { SurveyRepository } from '../../../domain/repositories/SurveyRepository';
import { Survey } from '../../../domain/entities/Survey';
import { convertJsonValueToObject } from '../../../utils';

const prisma = new PrismaClient();

export class PrismaSurveyRepository implements SurveyRepository {
  async create(survey: Survey): Promise<void> {
    await prisma.survey.create({
      data: survey,
    });
  }

  async update(survey: Survey): Promise<void> {
    await prisma.survey.update({
      where: { id: survey.id },
      data: survey,
    });
  }

  async findById(id: string): Promise<Survey | null> {
    const survey = await prisma.survey.findUnique({
      where: { id },
    });

    if (!survey) {
      return null;
    }

    return {
      ...survey,
      nicheAnswers: convertJsonValueToObject(survey.nicheAnswers),
    };
  }

  async listByNiche(nicheId: string, orderBy: 'asc' | 'desc'): Promise<Survey[]> {
    const surveys = await prisma.survey.findMany({
      where: { nicheId },
      orderBy: { stars: orderBy },
    });

    return surveys.map(survey => ({
      ...survey,
      nicheAnswers: convertJsonValueToObject(survey.nicheAnswers),
    }))
  }
}