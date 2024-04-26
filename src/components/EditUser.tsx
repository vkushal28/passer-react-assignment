import { useState, FC } from 'react'
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import UserForm from './UserForm';

interface Props {
    user?: any;
}
const EditUser: FC<Props> = ({
    user
}) => {
    const [open, setopen] = useState(false);
    return (
        <AlertDialog open={open}>
            <AlertDialogTrigger asChild>
                <Button onClick={() => setopen(true)}>Edit</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit User</AlertDialogTitle>
                    <AlertDialogDescription>
                        <UserForm
                            type="edit"
                            id={user?.id}
                            username={user?.username}
                            email={user?.email}
                            role={user?.role}
                            onClose={() => setopen(false)}
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setopen(false)}>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default EditUser