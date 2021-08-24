import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { fileOperation, readFile, writeFile } from './utils';
import { ITodoData } from '../src/typing';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-methods', 'POST,GET,PUT,DELETE,OPTION');
  next();
})

app.get('/todolist', function (req, res) {
  const todolist: string = readFile('todo.json');
  res.send(todolist);
});

app.post('/toggle', function (req, res) {
  const id: number = parseInt(req.body.id);

  fileOperation('todo.json', function (todoList: ITodoData[]) {
    return todoList.map((todo: ITodoData) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    })
  })
  res.send({
    msg: 'ok',
    statusCode: '200'
  })
})

app.post('/remove', function (req, res) {
  const id: number = parseInt(req.body.id);

  fileOperation('todo.json', function (todoList: ITodoData[]) {
    return todoList.filter((todo: ITodoData) => todo.id !== id);
  })

  res.send({
    msg: 'ok',
    statusCode: '200'
  })
})

app.post('/add', function (req, res) {
  const todo: ITodoData = JSON.parse(req.body.todo);
  fileOperation('todo.json', function (todoList: ITodoData[]) {
    const isExis = todoList.find((t: ITodoData) => t.content === todo.content);
    if (isExis) {
      res.send({
        msg: 'exist',
        statusCode: '100'
      })
    }

    todoList.push(todo);
    return todoList;
  })
  res.send({
    msg: 'ok',
    statusCode: '200'
  })
})

app.listen(8081, function () {
  console.log('Listening on port 8081');
})