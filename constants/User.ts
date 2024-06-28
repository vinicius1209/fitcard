export interface User {
    name?: string;
    email: string;
    authToken: string;
}


export interface UserContextType {
    user: User | null;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}
