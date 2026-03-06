import { Request, Response } from "express";

interface Todos {
  id: Number,
  text: String,
  createAt?: Date
}

let todos: Todos[] = [
  {
    id: 1,
    text: "Buy milk",
    createAt: new Date(),
  },
  {
    id: 2,
    text: "Buy dog",
    createAt: new Date(),
  },
  {
    id: 3,
    text: "Buy coffee",
    createAt: new Date(),
  },
  {
    id: 4,
    text: "Buy beer",
    createAt: new Date(),
  },
];

export class TodosController {
  //*DI

  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodosById = (req: Request, res: Response) => {

    const id = Number(req.params.id);
    if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});

    const todo = todos.find(tod => tod.id === id);
    console.log(id, 2);

    (todo)
    ? res.json(todo)
    : res.status(404).json(`Error with id ${id} not found`);
    
  }

  public createTodo = (req: Request, res: Response) => {
    
    const {text, createAt = new Date()} = req.body;

    if(!text) return res.status(400).json({error: 'Text property is require'});

    const newTodo = {
      id:  todos.length + 1,
      text: text,
      createAt: createAt
    }

    todos.push(newTodo);

    res.json(newTodo);
    
  }

  public updateTodo = (req: Request, res: Response) => {

    const id = Number(req.params.id);
    if(isNaN(id)) return res.status(400).json({error: `ID is not number`});

    const todo = todos.find(todo => todo.id === id);
    if(!todo) return res.status(404).json({error: `Todo wiht ID ${id} not found`});

    const {text} = req.body;
    // if(!text) return res.status(404).json({error: `Text property is required`});

    todo.text = text || todo.text; //Se realiza el cambio por referencia --No recomandado--

    todos.forEach((todo, index) => {
      if(todo.id === id){
        todos[index] = todo;   
      }
    });
    
    res.json(todo);

  }

  public deleteTodo = (req: Request, res: Response) => {

    const id = Number(req.params.id);
    if(isNaN(id)) return res.status(400).json({error: `ÌD is not a number`});

    const todoFind = todos.find(todo => todo.id === id);
    if(!todoFind) return res.status(404).json({error: `ID ${id} is not found`});

    //Metodo 1
    // const todoFilter = todos.filter(todo => todo.id !== id);
    /* todos = todoFilter;*/

    //Metodo 2 - - [array].splice(indice, 1) El método splice sirve para modificar un arreglo eliminando o insertando elementos.
    todos.splice(todos.indexOf(todoFind), 1); /* todos.indexOf(todo) Busca dentro del arreglo list el índice (posición) donde se encuentra el elemento*/

    // res.json(todoFilter);
    res.json(todoFind);



  }

}
