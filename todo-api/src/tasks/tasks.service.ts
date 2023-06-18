import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './create-task.dto';
import { UpdateTaskDto } from './update-task.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) { }

    async getAllTasks(): Promise<Task[]> {
        return this.tasksRepository.find();
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOne({ where: { id } });
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }
        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;
        const task: Task = {
            title, description, id: uuidv4()
        }
        return this.tasksRepository.save(task);
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        const task = await this.getTaskById(id);
        const { title, description, completed } = updateTaskDto;
        task.title = title || task.title;
        task.description = description || task.description;
        return this.tasksRepository.save(task);
    }

    async deleteTask(id: string): Promise<void> {
        const task = await this.getTaskById(id);
        await this.tasksRepository.remove(task);
    }
}
