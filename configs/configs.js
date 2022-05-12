

const env = process.env;

const config = {
  dblocal: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || "localhost",
    port: env.DB_PORT || "5432",
    user: env.DB_USER || "postgres",
    password: env.DB_PASSWORD || "123456",
    database: env.DB_NAME || "pamconpa",
  },
  dbuat:
  {
    host: env.DB_HOST || "bom-rds-nonprod.c8qajhn6dxvo.ap-southeast-1.rds.amazonaws.com",
    port: env.DB_PORT || "5432",
    user: env.DB_USER || "postgres",
    password: env.DB_PASSWORD || "WmN9PKt1G7kOhSMJ",
    database: env.DB_NAME || "pamconpa",
  },
  //listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports=config