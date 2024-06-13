import { Request, Response } from 'express';
import { CreateNicheQuestion } from '../../../application/use-cases/CreateNicheQuestion';
import { UpdateNicheQuestionNiches } from '../../../application/use-cases/UpdateNicheQuestionNiches';

export class NicheQuestionController {
  constructor(
    private createNicheQuestion: CreateNicheQuestion,
    private updateNicheQuestionNiches: UpdateNicheQuestionNiches
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      await this.createNicheQuestion.execute(req.body);
      return res.status(201).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ error: error.message });
      }
      return res.status(400).send({ error: 'An unexpected error occurred' });
    }
  }

  async updateNiches(req: Request, res: Response): Promise<Response> {
    try {
      await this.updateNicheQuestionNiches.execute({ id: req.params.id, niches: req.body.niches });
      return res.status(200).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ error: error.message });
      }
      return res.status(400).send({ error: 'An unexpected error occurred' });
    }
  }
}