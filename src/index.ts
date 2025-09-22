import { createApp } from './app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = createApp(prisma);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
