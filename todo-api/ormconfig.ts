import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username:  process.env.USER_NAME,
    password:  process.env.PASS_WORD,
    database:  process.env.DATABASE_NAME,
    entities: ['src/**/**/*.entity{.ts,.js}'],
    migrations: ['src/migration/*{.ts,.js}'],
});