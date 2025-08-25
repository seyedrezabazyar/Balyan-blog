export default defineEventHandler(async (event) => {
  return {
    status: 'ok',
    message: 'Server API is working',
    timestamp: new Date().toISOString()
  }
})