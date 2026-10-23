import axios from 'axios';

type ApiErrorBody = {
  title?: string;
  detail?: string;
  errors?: Record<string, string[]>;
};

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return 'The request took too long. Please try again.';
    }

    const data = error.response?.data as ApiErrorBody | undefined;
    const validationErrors = data?.errors ? Object.values(data.errors).flat() : [];

    if (validationErrors.length > 0) {
      return validationErrors[0];
    }

    if (error.response?.status === 404) {
      return 'Resource not found.';
    }

    return data?.detail ?? data?.title ?? error.message;
  }

  return 'Unexpected error. Please try again.';
};
