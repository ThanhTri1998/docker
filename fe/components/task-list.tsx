import { Task } from "../src/task.interface";
import TaskComponent from "./task";


interface Props {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onUpdate: (updatedTask: Task) => void;
}

const TasksList: React.FC<Props> = ({ tasks, onDelete, onUpdate }) => {
  return tasks?.length ? <div>
    {tasks.map((task) => (
      <TaskComponent
        key={task.id}
        task={task}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    ))}
  </div> : <div>No data</div>
};

export default TasksList;
