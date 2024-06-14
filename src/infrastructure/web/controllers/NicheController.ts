import { Request, Response } from 'express';
import { CreateNiche } from '../../../application/use-cases/CreateNiche';
import { ListNiches } from '../../../application/use-cases/ListNiches';

export class NicheController {
  constructor(
    private createNiche: CreateNiche,
    private listAll: ListNiches
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      await this.createNiche.execute(req.body);
      return res.status(201).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ error: error.message });
      }
      return res.status(400).send({ error: 'An unexpected error occurred' });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const answers = await this.listAll.execute();
      return res.status(200).json(answers);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send({ error: error.message });
      }
      return res.status(400).send({ error: 'An unexpected error occurred' });
    }
  }
}