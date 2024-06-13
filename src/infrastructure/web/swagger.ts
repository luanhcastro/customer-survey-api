import { OpenAPIV3 } from 'openapi-types';

const swaggerDocument: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Customer Satisfaction API',
    version: '1.0.0',
    description: 'API for managing customer satisfaction surveys',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  tags: [
    {
      name: 'Surveys',
      description: 'Customer Satisfaction Surveys',
    },
    {
      name: 'Niche Questions',
      description: 'Manage niche questions',
    },
  ],
  paths: {
    '/surveys': {
      post: {
        summary: 'Create a new survey',
        tags: ['Surveys'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nicheId: {
                    type: 'string',
                  },
                  stars: {
                    type: 'integer',
                  },
                  email: {
                    type: 'string',
                  },
                  nicheAnswers: {
                    type: 'object',
                  },
                },
                required: ['nicheId', 'stars', 'email'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Survey created successfully',
          },
          400: {
            description: 'Invalid input',
          },
        },
      },
    },
    '/surveys/{id}': {
      put: {
        summary: 'Update an existing survey',
        tags: ['Surveys'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The survey ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  stars: {
                    type: 'integer',
                  },
                  email: {
                    type: 'string',
                  },
                  nicheAnswers: {
                    type: 'object',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Survey updated successfully',
          },
          400: {
            description: 'Invalid input',
          },
          404: {
            description: 'Survey not found',
          },
        },
      },
    },
    '/surveys/{id}/answer': {
      post: {
        summary: 'Answer an existing survey',
        tags: ['Surveys'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The survey ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  answers: {
                    type: 'object',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Survey answered successfully',
          },
          400: {
            description: 'Invalid input',
          },
          404: {
            description: 'Survey not found',
          },
        },
      },
    },
    '/surveys/answers': {
      get: {
        summary: 'List survey answers by niche',
        tags: ['Surveys'],
        parameters: [
          {
            in: 'query',
            name: 'nicheId',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The niche ID',
          },
          {
            in: 'query',
            name: 'orderBy',
            schema: {
              type: 'string',
              enum: ['asc', 'desc'],
            },
            required: false,
            description: 'Order by stars (asc or desc)',
          },
        ],
        responses: {
          200: {
            description: 'List of survey answers',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Survey',
                  },
                },
              },
            },
          },
          400: {
            description: 'Invalid input',
          },
        },
      },
    },
    '/niche-questions': {
      post: {
        summary: 'Create a new niche question',
        tags: ['Niche Questions'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  key: {
                    type: 'string',
                  },
                  text: {
                    type: 'string',
                  },
                  label: {
                    type: 'string',
                  },
                  niches: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['key', 'text', 'label', 'niches'],
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Niche question created successfully',
          },
          400: {
            description: 'Invalid input',
          },
        },
      },
    },
    '/niche-questions/{id}/niches': {
      put: {
        summary: 'Update the niches associated with a niche question',
        tags: ['Niche Questions'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The niche question ID',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  niches: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['niches'],
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Niche question updated successfully',
          },
          400: {
            description: 'Invalid input',
          },
          404: {
            description: 'Niche question not found',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Survey: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          nicheId: {
            type: 'string',
          },
          stars: {
            type: 'integer',
          },
          email: {
            type: 'string',
          },
          nicheAnswers: {
            type: 'object',
          },
          created: {
            type: 'string',
            format: 'date-time',
          },
          updated: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      NicheQuestion: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          key: {
            type: 'string',
          },
          text: {
            type: 'string',
          },
          label: {
            type: 'string',
          },
          niches: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          created: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
    },
  },
};

export default swaggerDocument;
