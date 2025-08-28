import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { routes } from './routes';
import { ErrorHandler } from './middlewares/middleware';


const app = new Hono();


app.use('*', logger);


app.route('/', routes);


app.onError(ErrorHandler);


app.notFound((c) => {
  return c.json({
    success: false,
    message: 'Route not found'
  }, 404);
});

const port =  3000;

//@ts-ignore

console.log(`🚀 Trading server starting on port ${port}`);
//@ts-ignore
serve({
  fetch: app.fetch,
  port,
}, (info) => {
  console.log(` Trading server is running on http://localhost:${info.port}`);
});

export default app;