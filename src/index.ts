import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './infrastructure/web/swagger';
import nicheRouter from './infrastructure/web/routes/NicheRoutes';
import surveyRouter from './infrastructure/web/routes/SurveyRoutes';
import nicheQuestionRouter from './infrastructure/web/routes/NicheQuestionRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/niches', nicheRouter);
app.use('/surveys', surveyRouter);
app.use('/niche-questions', nicheQuestionRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
