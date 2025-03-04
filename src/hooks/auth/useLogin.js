
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { loginUser } from '../../api/authAPI';

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
            navigate('/', { replace: true });
           
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });


    return { mutate, isLoading: isPending, error };
};
