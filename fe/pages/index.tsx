import TaskForm from '@/components/task-form';
import TasksList from '@/components/task-list';
import { Task } from '@/src/task.interface';
import { useState, useEffect } from 'react';
import './globals.css';


const API_URL = "http://localhost:3002"


const TasksPage = ({ data }: { data: any }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Fetch tasks from the server
    useEffect(() => {
        fetch(`${API_URL}/tasks`)
            .then((response) => response.json())
            .then((data) => setTasks(data));
    }, []);

    const createTask = (newTask: Task) => {
        console.log(API_URL)
        fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
            .then((response) => response.json())
            .then((data) => setTasks([...tasks, data]));
    };

    const deleteTask = (taskId: string) => {
        fetch(`${API_URL}/tasks/${taskId}`, {
            method: 'DELETE',
        }).then(() => {
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            setTasks(updatedTasks);
        });
    };

    const updateTask = (updatedTask: Task) => {
        fetch(`${API_URL}/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
            .then((response) => response.json())
            .then((data) => {
                const updatedTasks = tasks.map((task) =>
                    task.id === data.id ? data : task
                );
                setTasks(updatedTasks);
            });
    };

    return (
        <div className='container m-auto mt-8'>
            <h1 className='text-center text-lg font-bold'>Tasks</h1>
            <TaskForm onCreate={createTask} />
            <TasksList tasks={tasks} onDelete={deleteTask} onUpdate={updateTask} />
        </div>
    );
};

export default TasksPage;
