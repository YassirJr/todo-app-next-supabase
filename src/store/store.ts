import {create, StoreApi, UseBoundStore} from 'zustand'
import {Todo} from "@/utils/supabase/types/todo";

interface TodosState {
    todos: Todo[],
}

interface TodosActions {
    setTodos: (todos: Todo[]) => void,
    addTodo: (todo: Todo) => void,
    removeTodo: (id: number) => void,
    updateTodo: (id: number, updatedTodo: Todo) => void,
}

type Store = TodosState & TodosActions

export const useTodos: UseBoundStore<StoreApi<Store>> = create((set) => ({
    todos: [],
    setTodos: (todos: Todo[]) => set({todos}),
    addTodo: (todo: Todo) => set((state: Store) =>
        ({todos: [...state.todos, todo]})),
    removeTodo: (id: number) => set((state: Store) =>
        ({todos: state.todos.filter(todo => todo.id !== id)})),
    updateTodo: (id: number, updatedTodo: Todo) => set((state: Store) =>
        ({todos: state.todos.map(todo => todo.id === id ? updatedTodo : todo)}))
}))
