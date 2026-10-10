/**
 * Environment Configuration
 * Centralized configuration for environment variables
 */

export const ENV = {
    // Application
    APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "OHMIND Admin",
    APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    NODE_ENV: process.env.NODE_ENV || "development",

    // API
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1",
    API_TIMEOUT: Number.parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "30000", 10),

    // Feature Flags
    ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
    ENABLE_DEBUG: process.env.NEXT_PUBLIC_ENABLE_DEBUG === "true",

    // Environment checks
    IS_PRODUCTION: process.env.NODE_ENV === "production",
    IS_DEVELOPMENT: process.env.NODE_ENV === "development",
    IS_TEST: process.env.NODE_ENV === "test",
} as const;

export type EnvConfig = typeof ENV;
