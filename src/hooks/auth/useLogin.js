import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { loginUser } from '../../api/authAPI';
import toast from 'react-hot-toast';

export const useLogin = () => {

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { isPending, mutate, error } = useMutation({
        mutationFn: (loginData) => loginUser(loginData),
        onSuccess: (data) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.user._id);
            setUser(data.user);
            toast.success('User logged in successfully');
            navigate('/', { replace: true });

        },
        onError: (error) => {
            console.error('Login failed:', error);
            toast.error(error.response.data.message || error.response.data.errors[0].msg);
        },
    });
    return { mutate, isLoading: isPending, error };
};
