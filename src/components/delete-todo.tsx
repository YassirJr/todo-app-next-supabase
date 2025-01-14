"use client"
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {createClient} from "@/utils/supabase/client";
import {SupabaseClient} from "@supabase/supabase-js";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useTodos} from "@/store/store";

export default function DeleteTodo({id}: { id: number }) {
    const supabase: SupabaseClient = createClient()
    const deleteTodoFromStore = useTodos(state => state.removeTodo)

    const handleDelete = async () => {
        const response = await supabase.from('todos').delete().eq('id', id)
        if (response.status === 204) {
            deleteTodoFromStore(id)
            toast.success('Todo deleted successfully')
        } else {
            toast.error('Failed to delete todo')
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}