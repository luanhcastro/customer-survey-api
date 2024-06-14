import { CreateSurvey } from '../src/application/use-cases/CreateSurvey';
import { SurveyRepository } from '../src/domain/repositories/SurveyRepository';
import { NicheRepository } from '../src/domain/repositories/NicheRepository';
import { NicheQuestionRepository } from '../src/domain/repositories/NicheQuestionRepository';

describe('CreateSurvey Use Case', () => {
  let createSurvey: CreateSurvey;
  let mockSurveyRepository: jest.Mocked<SurveyRepository>;
  let mockNicheRepository: jest.Mocked<NicheRepository>;
  let mockNicheQuestionRepository: jest.Mocked<NicheQuestionRepository>;

  beforeEach(() => {
    mockSurveyRepository = {
      create: jest.fn(),
    } as any;

    mockNicheRepository = {
      findById: jest.fn(),
    } as any;

    mockNicheQuestionRepository = {
      findManyByNiche: jest.fn(),
    } as any;

    createSurvey = new CreateSurvey(
      mockSurveyRepository,
      mockNicheRepository,
      mockNicheQuestionRepository
    );
  });

  it('should create a survey successfully', async () => {
    const request = {
      nicheId: '1',
      stars: 5,
      email: 'test@example.com',
      nicheAnswers: {
        'question1': 'answer1',
      },
    };

    mockNicheQuestionRepository.findManyByNiche.mockResolvedValue([
      { id: 'question1', key: 'key1', label: 'label1', niches: ['1'], created: new Date(), deleted: null },
    ]);

    await createSurvey.execute(request);

    expect(mockSurveyRepository.create).toHaveBeenCalledWith({
      nicheId: '1',
      stars: 5,
      email: 'test@example.com',
      nicheAnswers: {
        'question1': 'answer1',
      },
    });
  });

  it('should throw an error if stars are not between 1 and 5', async () => {
    const request = {
      nicheId: '1',
      stars: 6,
      email: 'test@example.com',
      nicheAnswers: {
        'question1': 'answer1',
      },
    };

    await expect(createSurvey.execute(request)).rejects.toThrow('Stars must be from 1 to 5');
  });

  it('should throw an error if question does not exist', async () => {
    const request = {
      nicheId: '1',
      stars: 5,
      email: 'test@example.com',
      nicheAnswers: {
        'invalidQuestion': 'answer1',
      },
    };

    mockNicheQuestionRepository.findManyByNiche.mockResolvedValue([
      { id: 'question1', key: 'key1', label: 'label1', niches: ['1'], created: new Date(), deleted: null },
    ]);

    await expect(createSurvey.execute(request)).rejects.toThrow("Question invalidQuestion doesn't exists");
  });
});
