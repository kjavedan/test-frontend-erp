export const API_CONFIG = {
  BASE_URL: process.env.BACKEND_URL,
  API_KEY: process.env.BACKEND_API_V1_KEY,
  VERSION: "/api/v1",
} as const;

// Separate endpoints by feature/module
export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_CONFIG.VERSION}/user/login`,
    VERIFY_OTP: `${API_CONFIG.VERSION}/user/verify-otp`,
  },
  DASHBOARD: {
    ACCOUNTANT: `${API_CONFIG.VERSION}/dashboard/accountant`,
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  LOCKED: 423,
  INTERNAL_SERVER_ERROR: 500,
} as const;
