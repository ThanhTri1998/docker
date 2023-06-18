import { useState } from 'react';
import { Task } from '../src/task.interface';

interface Props {
    task: Task;
    onDelete: (taskId: string) => void;
    onUpdate: (updatedTask: Task) => void;
}

const TaskComponent: React.FC<Props> = ({ task, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleDelete = () => {
        onDelete(task.id);
    };

    const handleUpdate = () => {
        const updatedTask: Task = {
            ...task,
            title,
            description,
        };
        onUpdate(updatedTask);
        setIsEditing(false);
    };

    return (
        <div className="p-4 bg-white shadow mb-4">
            {isEditing ? (
                <div>
                    <input
                        className="border rounded px-2 py-1 mb-2"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="border rounded px-2 py-1 mb-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleUpdate}
                    >
                        Save
                    </button>
                </div>
            ) : (
                <div>
                    <h3 className="text-lg font-bold mb-2">Title: {task.title}</h3>
                    <p className="mb-4">Description: {task.description}</p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskComponent;
