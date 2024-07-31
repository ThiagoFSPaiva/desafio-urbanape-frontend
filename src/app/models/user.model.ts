export type User = {
    id: string,
    name: string,
    email: string,
    role: "ADMIN" | "USER",
}

export type UserResponse = User | User[];

export interface UserCreation {
    name: string;
    password: string;
    email: string;
    role: string;
}
  
