const appConfig = {
  isDev: process.env.NODE_ENV === 'development' ? true : false,
  isTest: process.env.NODE_ENV === 'test' ? true : false,
  expiresIn: process.env.EXPIRES_IN || '2d',
  secretKey: process.env.SECRET_KEY || 'jwtSecretKey',
  nodePort: process.env.NODE_PORT || 8000,
  socketPort: process.env.SOCKET_PORT || '8001',
  redisKeyTtl: process.env.CACHE_TTL || 3000,
};

export default appConfig;
