import express, { Request, Response } from 'express';
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'System operational. Ready for the next lesson.' });
});

// Endpoint to get all posts
app.get('/posts', async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching posts." });
  }
});

// Endpoint to create a new post
app.post('/posts', async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while creating the post." });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
