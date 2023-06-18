import { useState } from 'react';
import { Task } from '../src/task.interface';

interface Props {
    onCreate: (newTask: Task) => void;
}

const TaskForm: React.FC<Props> = ({ onCreate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Task = {
            id: '',
            title,
            description,
        };
        onCreate(newTask);
        setTitle('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex justify-between mt-4">
            <input
                className="border rounded px-2 py-1 mb-2 h-12"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <textarea
                className="border rounded px-2 py-1 mb-2 h-12 w-1/2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            ></textarea>
            <button className="bg-blue-500 text-white px-4 py-2 rounded h-12" type="submit">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
