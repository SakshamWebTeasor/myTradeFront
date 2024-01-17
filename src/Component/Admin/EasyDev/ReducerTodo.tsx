import React, { useReducer, useRef } from "react";

type Props = {};

const ACTION = {
  TODO_ADD: "Todo_Add",
  TODO_TOGGLE: "Todo_Toggle",
  TODO_DELETE: "Todo_Delete",
};

interface Todos {
  todoId: number;
  value: string;
  completed: boolean;
}

function ReducerTodo({}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  function newTodo(value: string) {
    return {
      todoId: Date.now(),
      value: value,
      completed: false,
    };
  }
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTION.TODO_ADD:
        return [...state, newTodo(action.payload.value)];
      case ACTION.TODO_TOGGLE:
        return state.map((todo: Todos) =>
          todo.todoId === action.payload.todoId
            ? {...todo,completed:!todo.completed}
            : todo
        );
      case ACTION.TODO_DELETE:
        return state.filter(
          (todo: Todos) => todo.todoId !== action.payload.todoId
        );
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, []);
  const Todo = ({ todo, dispatch }: any) => (
    <div key={todo.todoId}>
      <button
        className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={() =>
          dispatch({
            type: ACTION.TODO_TOGGLE,
            payload: { todoId: todo.todoId },
          })
        }
      >
        {todo.completed ? "Completed" : "Todo"}
      </button>
      {todo.value}
      <button
        className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={() =>
          dispatch({
            type: ACTION.TODO_DELETE,
            payload: { todoId: todo.todoId },
          })
        }
      >
        Delete
      </button>
    </div>
  );
  return (
    <div>
      <h1>Todo List</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="Add Todo"
        className="border-2 px-2 border-black bg-slate-500 text-white"
      />
      <button
        className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        onClick={() =>
          inputRef.current?.value &&
          dispatch({
            type: ACTION.TODO_ADD,
            payload: { value: inputRef.current.value },
          })
        }
      >
        Add
      </button>
      {state.map((todo: Todos) => (
        <Todo todo={todo} dispatch={dispatch} />
      ))}
    </div>
  );
}

export default ReducerTodo;
