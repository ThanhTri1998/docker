import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/task.module';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: process.env.HOST,
        port: Number(process.env.PORT),
        username: process.env.USER_NAME,
        password: process.env.PASS_WORD,
        database: process.env.DATABASE_NAME,
        entities: [Task]
      }

    ),
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
