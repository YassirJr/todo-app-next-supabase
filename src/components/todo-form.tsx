"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {CreateTodo} from "@/utils/supabase/types/todo";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import {ArrowLeftIcon} from "lucide-react";
import {todosService} from "@/services/todosService";

const todoSchema = z.object({
    task: z.string(),
    is_complete: z.string().transform(value => value === "true"),
});

export default function TodoForm() {
    const router = useRouter()
    const params = useSearchParams()
    const formParam = params.get('form')
    const idParam = params.get('id')
    const form = useForm<z.infer<typeof todoSchema>>({
        resolver: zodResolver(todoSchema),
        defaultValues: async () => {
            if (formParam === 'update' && idParam) {
                const {data: todo} = await todosService.get(parseInt(idParam)) as { data: CreateTodo[] }
                return todo[0]!
            }
            return {
                task: '',
                is_complete: false,
            }
        }
    })

    async function onSubmit(values: z.infer<typeof todoSchema>) {
        try {
            if (formParam === 'update' && idParam) {
                await todosService.update(parseInt(idParam), {
                    task: values.task,
                    is_complete: values.is_complete,
                })
                router.push('/')
                return
            }
            await todosService.create(
                {
                    task: values.task,
                    is_complete: values.is_complete,
                },
            )
            router.push('/')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="container mx-auto py-10 space-y-6">
                <Link href="/">
                    <Button>
                        {
                            <ArrowLeftIcon/>
                        }
                    </Button>
                </Link>
                <h1 className="text-2xl">
                    {formParam === 'update' ? 'Update' : 'Create'} Todo
                </h1>
                <FormField
                    control={form.control}
                    name="task"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Task</FormLabel>
                            <FormControl>
                                <Input placeholder="task" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="is_complete"
                    render={({field}) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Is the task completed :</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={String(field.value)}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="false"/>
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            No
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="true"/>
                                        </FormControl>
                                        <FormLabel className="font-normal">Yes</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
