import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

// Use the test database URL from the environment
const testDatabaseUrl = process.env.TEST_DATABASE_URL;
if (!testDatabaseUrl) {
  throw new Error("TEST_DATABASE_URL is not set in .env file");
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: testDatabaseUrl,
    },
  },
});

const app = createApp(prisma);

describe('API Endpoints', () => {

  // Apply migrations before any tests run
  beforeAll(() => {
    execSync(`DATABASE_URL=${testDatabaseUrl} npx prisma migrate deploy`);
  });

  // Clean up the database before each test
  beforeEach(async () => {
    await prisma.post.deleteMany();
  });

  // Disconnect from the database after all tests are done
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /posts', () => {
    it('should create a new post and return it', async () => {
      const newPost = { title: 'Test Post', content: 'This is a test.' };
      const response = await request(app)
        .post('/posts')
        .send(newPost);

      // Check HTTP response
      expect(response.status).toBe(200);
      expect(response.body.title).toBe(newPost.title);
      expect(response.body.content).toBe(newPost.content);

      // Check database state
      const postInDb = await prisma.post.findUnique({ where: { id: response.body.id } });
      expect(postInDb).not.toBeNull();
      expect(postInDb?.title).toBe(newPost.title);
    });
  });

  describe('GET /posts', () => {
    it('should return an array of posts', async () => {
      // Seed the database with a post
      await prisma.post.create({
        data: {
          title: 'Seed Post',
          content: 'Content for GET test.',
        },
      });

      const response = await request(app).get('/posts');

      // Check HTTP response
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toBe('Seed Post');
    });
  });
});
