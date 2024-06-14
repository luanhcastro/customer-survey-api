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

/**
 * @swagger
 * tags:
 *   name: Surveys
 *   description: Customer Satisfaction Surveys
 */

/**
 * @swagger
 * /surveys:
 *   post:
 *     summary: Create a new survey
 *     tags: [Surveys]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nicheId:
 *                 type: string
 *               stars:
 *                 type: integer
 *               email:
 *                 type: string
 *               nicheAnswers:
 *                 type: object
 *             required:
 *               - nicheId
 *               - stars
 *               - email
 *     responses:
 *       201:
 *         description: Survey created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', (req, res) => surveyController.create(req, res));

/**
 * @swagger
 * /surveys/{id}:
 *   put:
 *     summary: Update an existing survey
 *     tags: [Surveys]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The survey ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stars:
 *                 type: integer
 *               email:
 *                 type: string
 *               nicheAnswers:
 *                 type: object
 *     responses:
 *       200:
 *         description: Survey updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Survey not found
 */
router.put('/:id', (req, res) => surveyController.update(req, res));

/**
 * @swagger
 * /surveys/answers:
 *   get:
 *     summary: List survey answers by niche
 *     tags: [Surveys]
 *     parameters:
 *       - in: query
 *         name: nicheId
 *         schema:
 *           type: string
 *         required: true
 *         description: The niche ID
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         required: false
 *         description: Order by stars (asc or desc)
 *     responses:
 *       200:
 *         description: List of survey answers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Survey'
 *       400:
 *         description: Invalid input
 */
router.get('/answers', (req, res) => surveyController.list(req, res));

export default router;