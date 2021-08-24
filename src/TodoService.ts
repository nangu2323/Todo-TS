import $ from 'jquery';
import { ITodoData } from './typing';

export function getTodoList(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void {
  //保存原有的init 函数
  const _origin = descriptor.value;
  // 重写init
  descriptor.value = function (todoData: ITodoData[]) {
    $.get('http://localhost:8081/todolist').then((res: string) => {
      if (!res) return;
      todoData = JSON.parse(res);
    }).then(() => {
      console.log(this, 'ddd ');
      _origin.call(this, todoData);
    })
  }
}


export function removeTodoList(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void {
  const _origin = descriptor.value;
  descriptor.value = function (target: HTMLElement, id: number) {
    $.post('http://localhost:8081/remove', { id }).then(res => {
      _origin.call(this, target, id)
    })
  }
}

export function toggleTodo(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void {
  const _origin = descriptor.value;

  descriptor.value = function (target: HTMLElement, id: number) {
    $.post('http://localhost:8081/toggle', { id }).then(res => {
      _origin.call(this, target, id)
    })
  }

}

export function addTodo(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
): void {
  const _origin = descriptor.value;

  descriptor.value = function (todo: ITodoData) {
    $.post('http://localhost:8081/add', { todo: JSON.stringify(todo) }).then(res => {
      if (res.statusCode === '100') {
        alert('已经存在');
        return;
      }
      _origin.call(this, todo)
    })
  }
}