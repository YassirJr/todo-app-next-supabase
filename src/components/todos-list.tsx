"use client"

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Todo} from "@/utils/supabase/types/todo";
import {Badge} from "@/components/ui/badge";
import {formatDate} from "date-fns";
import DeleteTodo from "@/components/delete-todo";
import {useTodos} from "@/store/store";
import {useEffect} from "react";

export default function TodosList({todos}: { todos: Todo[] }) {
    const {todos: data, setTodos} = useTodos()

    useEffect(() => {
        setTodos(todos)
    }, [todos])

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Todo List</h1>
                <Link href="/todos?form=create">
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
                            <TableHead className="w-[200px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data.length > 0 ? (
                                data.map((todo: Todo) => (
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
                                        <TableCell className="flex gap-2">
                                            <DeleteTodo id={todo.id} key={todo.id}/>
                                            <Link href={`/todos?form=update&id=${todo.id}`}>
                                                <Button className="bg-yellow-400">Edit</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No todos found</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}