import { FC } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch, useSelector } from 'react-redux'
import {
    updateUser,
    addUser
} from "../redux/slice/UserSlice";
import { toast } from '@/components/ui/use-toast';

interface Props {
    username?: string;
    email?: string;
    role?: boolean;
    id?: string;
    type?: 'add' | 'edit';
    onClose?: () => void;
}

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Enter a valid email",
    }),
    role: z.string(),
})

const UserForm: FC<Props> = ({
    username, email, role, id, type, onClose
}) => {
    const UserState = useSelector((state) => state.userState);
    const editMode = type === "edit";
    const createMode = type === "add";
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: username || "",
            email: email || "",
            role: role === true ? 'admin' : role === false ? 'user' : ""
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (editMode) {
            dispatch(
                updateUser({
                    id: id,
                    data: { ...values, id: id, role: values.role === 'admin' ? true : false },
                })
            );
            toast({
                description: "Details updated.",
                duration: 1500
            })
            onClose && onClose();
        } else if (createMode) {
            dispatch(
                addUser({ ...values, id: (parseInt(UserState?.users?.[UserState?.users?.length - 1]?.id) + 1).toString() })
            );
            onClose && onClose();
            toast({
                description: "User created.",
                duration: 1500
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    aria-rowspan={2}
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="admin" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            Admin
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="user" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            User
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit">Save</Button>
            </form>
        </Form>
    )
}

export default UserForm