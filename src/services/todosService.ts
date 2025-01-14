import {createClient as supabaseBrowser} from "@/utils/supabase/client";
import {CreateTodo} from "@/utils/supabase/types/todo";

const client = supabaseBrowser()


export const todosService = {
    getAll: async () => await client.from('todos').select(),
    get: async (id: number) => await client.from('todos').select().eq('id', id),
    create: async (todo: CreateTodo) => await client.from('todos').insert<CreateTodo>([todo]),
    update: async (id: number, todo: CreateTodo) => await client.from('todos').update<CreateTodo>(todo).eq('id', id),
    delete: async (id: number) => await client.from('todos').delete().eq('id', id)
} as const