import { PlusCircle } from "phosphor-react";
import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { NoHaveTask } from "../NoHaveTask";

import { Task } from "../Task";

import styles from "./index.module.css";

interface Task {
  id: string;
  content: string;
  complete: boolean;
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  const numberOfCompletedTasks = tasks.filter(
    (task) => task.complete === true
  ).length;

  useEffect(() => {
    const tasks = localStorage.getItem("@tasks");
    if (tasks) {
      setTasks(JSON.parse(tasks));
    }
  }, []);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: uuidv4(),
      content: newTaskText,
      complete: false,
    };

    const newArrayTasks = [...tasks, newTask];
    setTasks(newArrayTasks);
    setNewTaskText("");
    localStorage.setItem("@tasks", JSON.stringify(newArrayTasks));
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");

    setNewTaskText(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteTask(taskToDeleteId: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== taskToDeleteId;
    });

    setTasks(tasksWithoutDeletedOne);
    localStorage.setItem("@tasks", JSON.stringify(tasksWithoutDeletedOne));
  }

  function completeTask(taskToCompleteId: string) {
    const newTasks = tasks.map((task) =>
      task.id === taskToCompleteId
        ? { ...task, complete: !task.complete }
        : task
    );

    setTasks(newTasks);
    localStorage.setItem("@tasks", JSON.stringify(newTasks));
  }

  return (
    <>
      <form onSubmit={handleCreateNewTask} className={styles.form}>
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
          value={newTaskText}
          required
        />
        <button type="submit">
          Criar <PlusCircle size={24} />
        </button>
      </form>
      <header className={styles.header}>
        <span className={styles.createdTasks}>
          Tarefas criadas <strong>{tasks.length}</strong>
        </span>
        <span className={styles.completedTasks}>
          Concluídas
          <strong>
            {numberOfCompletedTasks} de {tasks.length}
          </strong>
        </span>
      </header>
      {tasks.length ? (
        tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              onCompleteTask={completeTask}
              onDeleteTask={deleteTask}
            />
          );
        })
      ) : (
        <NoHaveTask />
      )}
    </>
  );
}
