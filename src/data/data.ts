import bcrypt from "bcrypt";
import { User } from "../models";

const users: User[] = [
    {
        id: 1,
        username: "user1",
        password: bcrypt.hashSync("password1", 10),
    },
    {
        id: 2,
        username: "user2",
        password: bcrypt.hashSync("password2", 10),
    },
];

const db = {
    findUserByUsername: (username: string): User | undefined => {
        return users.find((user) => user.username === username);
    },
    createUser: (user: { username: string; password: string }): User => {
        const newUser: User = {
            id: users.length + 1,
            username: user.username,
            password: user.password,
        };
        users.push(newUser);
        return newUser;
    },
};

export default db;
