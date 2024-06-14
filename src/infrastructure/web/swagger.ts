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
      name: 'Niches',
      description: 'Customer Niches Config',
    },
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
    '/niches': {
      get: {
        summary: 'List all niches',
        tags: ['Niches'],
        responses: {
          200: {
            description: 'List of niches',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Niche',
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
      post: {
        summary: 'Create a new niche',
        tags: ['Niches'],
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
                  name: {
                    type: 'string',
                  },
                },
                required: ['key', 'name']
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Niche created successfully',
          },
          400: {
            description: 'Invalid input',
          },
        },
      },
    },
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
                    example: 5,
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
                required: ['key', 'label', 'niches'],
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
                    example: 5,
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
    '/niche-questions/{nicheId}': {
      get: {
        summary: 'List questions by niche',
        tags: ['Niche Questions'],
        parameters: [
          {
            in: 'path',
            name: 'nicheId',
            schema: {
              type: 'string',
            },
            required: true,
            description: 'The niche ID',
          },
        ],
        responses: {
          200: {
            description: 'List of niche questions',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/NicheQuestion',
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
            example: 5,
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
      Niche: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
          },
          name: {
            type: 'string',
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
