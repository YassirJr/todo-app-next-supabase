export interface Todo {
    id: number,
    task: string,
    is_complete: boolean,
    inserted_at: Date,
}

export interface CreateTodo {
    task: string,
    is_complete: boolean,
}