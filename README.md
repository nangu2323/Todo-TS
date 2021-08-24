### 传统写法

## 1.绑定事件处理函数

# 1.增加项 每一项的试图 -> 列表 -> 增加一项

# 2.删除项 将对应项的视图 -> 列表 -> 删除

# 3.改变完成的状态 将对应项的完成状态 -> 是否完成

#### 面向对象 类的继承 横向切割 -设计方案

## 1.程序进行分类

外层：浏览器的事件 -> 调用方法 -> 事件处理函数的绑定
操作数据： addToDo ,removeTodo ,toggleComplete
操作 dom: addItem,removeItem,changeCompleted
管理模板: todoView -> 接受参数
