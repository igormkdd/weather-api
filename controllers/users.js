import { v4 as uuidv4 } from "uuid";

let users = [];

export const createUser = (req, res) => {
    const user = req.body;
    users.push({ ...user, id: uuidv4() });
    res.send(`User with the name ${user.firstName} is added to the DB`);
};

export const getUsers = (req, res) => {
    console.log(users);
    res.send(users);
};

export const getUser = (req, res) => {
    const { id } = req.params;
    const foundUser = users.find((user) => user.id == id);
    res.send(foundUser);
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    const user = users.find((user) => user.id == id);

    if (fullName) {
        user.firstName = firstName;
    }
    if (email) {
        user.lastName = lastName;
    }
    if (password) {
        user.age = age;
    }
    res.send(`User with the id ${id} is updated`);
};

export const deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter((user) => user.id != id);
    res.send(`User with the id ${id} is deleted from the DB`);
};
