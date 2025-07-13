const levels = {
  info: 'INFO',
  error: 'ERROR',
  debug: 'DEBUG',
};

const timestamp = () => new Date().toISOString();

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    console.log(`[${timestamp()}] [${levels.info}]`, message, ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`[${timestamp()}] [${levels.error}]`, message, ...args);
  },
  debug: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[${timestamp()}] [${levels.debug}]`, message, ...args);
    }
  },
};
