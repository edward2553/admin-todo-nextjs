import { ZodErrorResponse } from '../interfaces/zod';

export const handleError = (err: ZodErrorResponse) => {
  const zodErr = err.issues.map((issue) => ({
    code: issue.code,
    message: issue.message,
    expected: issue.expected,
    received: issue.received,
  }));

  return { zodErr };
};
