import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "gymapp",
  logging: true,
  entities: ["src/context/**/entity/*.entity.ts"],
  migrations: [__dirname + "/migrations/*{.ts,.js}"],
});
