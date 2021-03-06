import React, { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.scss";
import { TodoType } from "../../redux/reducers/todoReducer";
import { useHistory } from "react-router-dom";

interface TodoItemPropsType {
  todo: TodoType;
  isDeleteModeActive: boolean;
  setDeletingTodoId: Dispatch<SetStateAction<string | null>>;
  setDeleteModalTitle: Dispatch<SetStateAction<string>>;
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
}

const TodoItem = ({
  todo,
  isDeleteModeActive,
  setDeletingTodoId,
  setDeleteModalTitle,
  setIsDeleteModalOpen,
}: TodoItemPropsType) => {
  const history = useHistory();
  const title =
    todo.title.length > 20 ? todo.title.substr(0, 20) + "..." : todo.title;

  let todoItemAction = (id: string | null, title: string) => {
    if (id) {
      if (isDeleteModeActive) {
        setDeletingTodoId(id);
        setDeleteModalTitle(title);
        setIsDeleteModalOpen(true);
      } else {
        history.push(`/mytodos/${id}`);
      }
    }
  };

  return (
    <div
      key={todo.id}
      onClick={() => todoItemAction(todo.id, todo.title)}
      className={
        isDeleteModeActive
          ? [styles.todo, styles.todo__dm].join(" ")
          : styles.todo
      }
    >
      {title}
    </div>
  );
};

export default TodoItem;
