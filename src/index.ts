import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'System operational. Ready for the next lesson.' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
