import {Todo} from "@/utils/supabase/types/todo";
import TodosList from "@/components/todos-list";
import {todosService} from "@/services/todosService";

export default async function TodoTable() {
    const {data: todos} = await todosService.getAll() as { data: Todo[] }
    return (
        <TodosList todos={todos}/>
    )
}

