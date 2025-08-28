import { Hono } from 'hono';
import { routes } from './routes';
import { ErrorHandler, PerformanceLogger } from './middlewares/middleware';

const app = new Hono();

// Add performance logging middleware
app.use('*', PerformanceLogger);

app.route('/', routes);

app.onError(ErrorHandler);

app.notFound((c) => {
  return c.json({
    success: false,
    message: 'Route not found'
  }, 404);
});


export default app;