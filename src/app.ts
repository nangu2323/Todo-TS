import TodoEvent from "./TodoEvent";
import { ITodoData } from "./typing";

((doc) => {
  const oInput: HTMLInputElement = document.querySelector('input');
  const oAddBtn: HTMLButtonElement = document.querySelector('button');
  const oTodoList: HTMLLIElement = document.querySelector('.todo-list');

  const todoData: ITodoData[] = [
    // {
    //   id: 1,
    //   content: '123',
    //   completed: true
    // },
    // {
    //   id: 2,
    //   content: '234',
    //   completed: false
    // },
    // {
    //   id: 3,
    //   content: '345',
    //   completed: true
    // }
  ]

  const todoEvent = new TodoEvent(todoData, oTodoList);


  const init = (): void => {
    bindEvent();
  }
  //绑定事件  事件代理
  function bindEvent(): void {
    oAddBtn.addEventListener('click', handleAddBtnClick, false);
    oTodoList.addEventListener('click', handleListClick, false);
  }

  function handleAddBtnClick(): void {
    const val: string = oInput.value.trim();

    if (val.length) {
      const ret = todoEvent.addTodo({
        id: new Date().getTime(),
        content: val,
        completed: false
      })

      if (ret && ret === 1001) {
        alert('列表已经存在');
        return;
      }
    }

    oInput.value = '';

    console.log(todoData);

  }

  function handleListClick(e: MouseEvent): void {
    const tar = e.target as HTMLElement;
    const tagName = tar.tagName.toLowerCase();

    if (tagName === 'input' || tagName === 'button') {
      const id = parseInt(tar.dataset.id)
      switch (tagName) {
        case 'input':
          todoEvent.toggleComplete(tar, id);
          break
        case 'button':
          todoEvent.removeTodo(tar, id)
          break
        default:
          break
      }
    }
  }

  init()

})(document)
