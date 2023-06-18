import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    async getAllTasks(): Promise<Task[]> {
        return this.tasksService.getAllTasks();
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Put(':id')
    async updateTask(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ): Promise<Task> {
        return this.tasksService.updateTask(id, updateTaskDto);
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id);
    }
}
