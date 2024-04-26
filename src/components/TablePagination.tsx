import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage } from "../redux/slice/UserSlice";


const TablePagination = () => {
    const UserState = useSelector((state) => state.userState);
    const dispatch = useDispatch();

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(UserState.users.length / UserState.usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => dispatch(setCurrentPage(UserState.currentPage - 1))} />
                </PaginationItem>
                {pageNumbers.map((number) => (
                    <PaginationItem key={number}>
                        <PaginationLink onClick={() => dispatch(setCurrentPage(number))} isActive={Boolean(UserState.currentPage === number)}>{number}</PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext onClick={() => dispatch(setCurrentPage(UserState.currentPage + 1))} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default TablePagination