import { CheckCircle, Circle, Trash } from "phosphor-react";

import styles from "./index.module.css";

interface Task {
  id: string;
  content: string;
  complete: boolean;
}

interface TasksProps {
  task: Task;
  onDeleteTask: (comment: string) => void;
  onCompleteTask: (comment: string) => void;
}

export function Task({ task, onCompleteTask, onDeleteTask }: TasksProps) {
  function handleCheck() {
    onCompleteTask(task.id);
  }

  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  return (
    <section className={styles.task}>
      <button className={styles.taskCheck} onClick={handleCheck}>
        {task.complete ? (
          <CheckCircle className={styles.iconCheck} size={24} />
        ) : (
          <Circle size={24} />
        )}
      </button>

      {task.complete ? (
        <p className={styles.paragraphCheck}>{task.content}</p>
      ) : (
        <p>{task.content}</p>
      )}

      <button
        className={styles.taskTrash}
        onClick={handleDeleteTask}
        title="Deletar Comentário"
      >
        <Trash size={24} />
      </button>
    </section>
  );
}
