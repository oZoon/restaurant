type EnvType = {
  API_KEY: string
  AUTH_DOMAIN: string
  PROJECT_ID: string
  STORAGE_BUCKET: string
  MESSAGING_SENDER_ID: string
  APP_ID: string
  MEASUREMENT_ID: string
  DATABASE_URL: string
}

const parsed = process.env.parsed as unknown as EnvType

export const apiKey = parsed.API_KEY
export const authDomain = parsed.AUTH_DOMAIN
export const projectId = parsed.PROJECT_ID
export const storageBucket = parsed.STORAGE_BUCKET
export const messagingSenderId = parsed.MESSAGING_SENDER_ID
export const appId = parsed.APP_ID
export const measurementId = parsed.MEASUREMENT_ID
export const databaseURL = parsed.DATABASE_URL
