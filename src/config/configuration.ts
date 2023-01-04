

interface EnvironmentVariables {
  appUrl: string;
  port: number;
  salt: string;
  adminUserName:string
  adminPassWord:string
  node_env: string;
  mongodb: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  postgres:{
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  }
  jwt: {
    secret: string;
    rt_secret: string;
    expired_in: string;
    rt_expired_in: string;
  };
}

export const configuration = (): EnvironmentVariables => {
  const envVariable: EnvironmentVariables = {
    adminUserName: process.env.USER_NAME,
    adminPassWord: process.env.PASSWORD,
    appUrl: process.env.APP_URL,
    port: parseInt(process.env.PORT, 10),
    node_env: process.env.NODE_ENV,
    salt: process.env.SALT,

    jwt: {
      secret: process.env.JWT_SECRET,
      rt_secret: process.env.JWT_RT_SECRET,
      expired_in: process.env.JWT_EXPIRED_IN,
      rt_expired_in: process.env.JWT_RT_EXPIRED_IN,
    },
    mongodb: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT, 10),
      username: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      database: process.env.MONGO_DB,
    },
    postgres:{
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT,10),
      username:  process.env.POSTGRES_USER,
      password:  process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    }
  };

  console.log(envVariable,"⛄️ envVariable");
  return envVariable;
};



