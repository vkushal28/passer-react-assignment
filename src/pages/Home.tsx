import { useEffect } from 'react'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from "../redux/slice/UserSlice";
import { useNavigate } from 'react-router-dom';
import AddUser from '@/components/AddUser';
import TablePagination from '@/components/TablePagination';

const Home = () => {
    const UserState = useSelector((state) => state.userState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        !UserState.users.length && getMockUsers();
    }, []);
    const getMockUsers = async () => {
        await fetch('https://662b7ff5de35f91de1587a8b.mockapi.io/users')
            .then(resp => resp.json()).then(users => {
                dispatch(setUsers(users));
            })
    }
    // Pagination logic
    const indexOfLastUser = UserState.currentPage * UserState.usersPerPage;
    const indexOfFirstUser = indexOfLastUser - UserState.usersPerPage;
    const currentUsers = UserState.users.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div>
            <AddUser />
            <Table className="shadow-lg rounded-lg">
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="text-center">S.No.</TableHead>
                        <TableHead className="text-center">ID</TableHead>
                        <TableHead className="text-center">Username</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-right">Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        currentUsers.map((user: { id: string, username: string, role: boolean, email: string }, index: number) => (
                            <TableRow key={index} onClick={() => {
                                navigate(`/user/${user.id}`);
                            }}>
                                <TableCell>#{((10 * (UserState.currentPage - 1)) + index) + 1}</TableCell>
                                <TableCell>{user.id}</TableCell>
                                <TableCell className="font-medium">{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className="px-2 py-1 text-xs">{user.role ? 'Admin' : 'User'}</Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <TablePagination />
        </div>
    )
}

export default Home