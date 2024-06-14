import { Request, Response } from 'express';
import { CreateSurvey } from '../../../application/use-cases/CreateSurvey';
import { UpdateSurvey } from '../../../application/use-cases/UpdateSurvey';
import { ListSurveyAnswers } from '../../../application/use-cases/ListSurveyAnswers';

export class SurveyController {
  constructor(
    private createSurvey: CreateSurvey,
    private updateSurvey: UpdateSurvey,
    private listSurveyAnswers: ListSurveyAnswers
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      await this.createSurvey.execute(req.body);
      return res.status(201).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ error: error.message });
      }
      return res.status(400).send({ error: 'An unexpected error occurred' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      await this.updateSurvey.execute({ id: req.params.id, ...req.body });
      return res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ error: error.message });
      }
      return res.status(400).send({ error: 'An unexpected error occurred' });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const answers = await this.listSurveyAnswers.execute(req.query as any);
      return res.status(200).json(answers);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ error: error.message });
      }
      return res.status(400).send({ error: 'An unexpected error occurred' });
    }
  }
}