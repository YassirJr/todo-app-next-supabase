import {Badge} from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {createClient} from "@/utils/supabase/client";
import {Todo} from "@/utils/supabase/types/todo";
import {formatDate} from "date-fns";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default async function TodoTable() {
    const supabase = createClient()
    const {data: todos} = await supabase.from('todos').select() as { data: Todo[] }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Todo List</h1>
                <Link href="/new">
                    <Button>
                        Add new todo
                    </Button>
                </Link>
            </div>
            <div className="border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Task</TableHead>
                            <TableHead className="w-[150px]">Status</TableHead>
                            <TableHead className="w-[200px]">Inserted At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {todos.map((todo: Todo) => (
                            <TableRow key={todo.id}>
                                <TableCell className="font-medium">{todo.id}</TableCell>
                                <TableCell>{todo.task}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <Badge variant={todo.is_complete ? "default" : "secondary"}>
                                            {todo.is_complete ? "Completed" : "Pending"}
                                        </Badge>
                                    </div>
                                </TableCell>
                                <TableCell>{formatDate(todo.inserted_at, "yyyy-mm-dd")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

