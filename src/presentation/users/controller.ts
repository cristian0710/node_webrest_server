import { Request, Response } from "express";

interface UsersList {
  id: Number;
  name: String;
  lastName?: String;
  age: Number;
}

const usersList: UsersList[] = [
  {
    id: 1,
    name: "Cristian",
    lastName: "Duran",
    age: 37,
  },
  {
    id: 2,
    name: "Juan",
    age: 33,
  },
];

export class Users {
  constructor() {}

  public getUsers = (req: Request, res: Response) => {
    res.json(usersList);
  };

  public getUserById = (req: Request, res: Response) => {
    
    const id = Number(req.params.id);
    if(isNaN(id)) return res.status(404).json({Error: `ID argument is not number`});

    const idUser = usersList.find(user => user.id === id);

    console.log(idUser);

    (idUser)
    ? res.json(idUser)
    : res.status(404).json({error: `Error with ID ${id} not found`});
    
  }

  public createUser = (req: Request, res: Response) => {
    
    const {name, lastName="", age} = req.body;

    if(!name) return res.status(400).json({error: 'Name is require'});
    if(!age) return res.status(400).json({error: 'age is require'});

    const newUser = {
        id: usersList.length + 1,
        name: name,
        lastName: lastName,
        age: Number(age)
    };

    usersList.push(newUser);

    console.log(newUser);
    res.json(newUser);

  }

}
