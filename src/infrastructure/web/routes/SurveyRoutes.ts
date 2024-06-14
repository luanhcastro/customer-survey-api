import { Router } from 'express';
import { SurveyController } from '../controllers/SurveyController';
import { PrismaSurveyRepository } from '../../database/prisma/PrismaSurveyRepository';
import { PrismaNicheRepository } from '../../database/prisma/PrismaNicheRepository';
import { PrismaNicheQuestionRepository } from '../../database/prisma/PrismaNicheQuestionRepository';
import { CreateSurvey } from '../../../application/use-cases/CreateSurvey';
import { UpdateSurvey } from '../../../application/use-cases/UpdateSurvey';
import { ListSurveyAnswers } from '../../../application/use-cases/ListSurveyAnswers';

const surveyRepository = new PrismaSurveyRepository();
const nicheRepository = new PrismaNicheRepository();
const nicheQuestionRepository = new PrismaNicheQuestionRepository();

const surveyController = new SurveyController(
  new CreateSurvey(surveyRepository, nicheRepository, nicheQuestionRepository),
  new UpdateSurvey(surveyRepository),
  new ListSurveyAnswers(surveyRepository)
);

const router = Router();

router.post('/', (req, res) => surveyController.create(req, res));

router.get('/', (req, res) => surveyController.list(req, res));

router.put('/:id', (req, res) => surveyController.update(req, res));

export default router;