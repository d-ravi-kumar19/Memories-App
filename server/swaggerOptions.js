import swaggerJsdoc from 'swagger-jsdoc';

// Load Swagger documentation from file
// const swaggerDocs = readFileSync('./swagger-docs.js', 'utf8');

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Memories Web App API',
      version: '1.0.0',
      description: 'API documentation for the Memory application',
    },
    servers: [
      {
        url: 'http://localhost:9000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./swagger-doc.js'], // Path to your Swagger docs
};


const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
