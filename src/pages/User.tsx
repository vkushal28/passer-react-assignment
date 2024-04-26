import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import DeleteUser from '@/components/DeleteUser';
import EditUser from '@/components/EditUser';
import { removeUser } from "../redux/slice/UserSlice";
import { toast } from '@/components/ui/use-toast';

const User = () => {
    const params = useParams();
    const { id } = params;
    const UserState = useSelector((state) => state.userState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getData = useMemo(() => {
        let data;
        UserState.users.forEach((val) => {
            if (val.id === id) {
                data = val;
            }
        });
        if (!data) navigate("/");
        return data;
    }, [id, UserState.users]);
    useEffect(() => {
        if (id && !getData) navigate("/");
    }, [getData, id])
    const handleDelete = () => {
        dispatch(removeUser(getData.id));
        toast({
            description: "User deleted.",
            duration: 1500
        })
        navigate("/");
    };

    return (
        <div className="max-w-xl m-auto pt-12 w-full items-center">
            <div className="bg-blue-900">
                <div className="flex flex-col items-center justify-evenly h-[10rem]">
                    <div className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                        {getData?.id}. {getData?.username}<Badge className="ml-4 px-2 py-1 text-xs">{getData?.role ? 'Admin' : 'User'}</Badge>
                        <p className="text-white text-xs sm:text-base">
                            {getData?.email}
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
                        <EditUser user={getData || {}} />
                        <DeleteUser clickCb={handleDelete} username={getData?.username} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User