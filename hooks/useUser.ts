import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContextType, User } from '@/constants/User';
import api from '@/utils/api';

const API_URL: string = 'https://x8ki-letl-twmt.n7.xano.io/api:FEqbEpBj/auth';


const useUser = (): UserContextType => {

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { authToken } = response.data;

            await AsyncStorage.setItem('authToken', authToken);
            setUser({ email, authToken });
            setError(null);  // Limpar o erro após o sucesso
        } catch (err) {
            setError('Failed to login. Please check your credentials.');
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await api.post('/auth/register', { name, email, password });
            const { authToken } = response.data;

            await AsyncStorage.setItem('authToken', authToken);
            setUser({ name, email, authToken });
            setError(null);  // Limpar o erro após o sucesso
        } catch (err) {
            setError('Failed to register. Please try again.');
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('authToken');
        setUser(null);
        setError(null);  // Limpar o erro após o logout
    };

    return {
        error,
        user,
        login,
        register,
        logout
    };

};

export default useUser;

