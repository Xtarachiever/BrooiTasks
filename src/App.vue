<template>
  <div class="todo-container">
    <h2>TODO List App</h2>
    <form @submit.prevent="handleSubmit">
      <div class="input-div">
        <input placeholder="Todo Item" @blur="handleInputBlur" v-model="todoText" class="input-field" type="text"/>
        <button type="submit" v-if="editing">Update</button>
        <button type="submit" v-else>Submit</button>
      </div>
      <div class="status-container">
        <div class="status-option">
          <span class="status-header">Status:</span>
          <label>
            <input type="radio" value="Completed" v-model="todoStatus"/>
            <span>Completed</span>
          </label>
          <label>
            <input type="radio" value="Ongoing" v-model="todoStatus"/>
            <span>Ongoing</span>
          </label>
          <label>
            <input type="radio" value="Todo" v-model="todoStatus"/>
            <span>Todo</span>
          </label>
        </div>
        <div class="select-div">
          <select class="status-field" @change="handleSelect($event.target.value)">
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Uncompleted">Uncompleted</option>
          </select>
        </div>
      </div>
    </form>
    <TodoLists :todos="filteredTodos" @delete-todo="deleteTodo" @edit-todo="editTodo" />
  </div>
</template>

<script>

import TodoLists from './components/TodoLists.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  name: 'App',
  components: {
    TodoLists
  },
  data(){
    return{
      todoText:"",
      todoStatus:"",
      todos:[],
      filteredTodos: [],
      editing:false,
      index: 0,
      repeatedTask: 0
    }
  },
   mounted() {
    // Retrieve todos from local storage when the component is mounted
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
        this.todos.forEach(todo => {
    // Check if the todoStatus is 'Completed'
      if (todo.todoStatus === 'Completed') {
        // Update the 'done' property to true
        todo.done = true;
      }
      localStorage.setItem('todos', JSON.stringify(this.todos));
    });
    }
    this.filteredTodos = this.todos;
  },
  methods:{
    clearInputFields() {
      this.todoText = "";
      this.todoStatus = "";
    },
    addTodo(){
      this.repeatedTask = this.todos.findIndex(todo=>(todo.todoText.trim() === this.todoText.trim()))
      if(this.todoText.trim() === '' || this.todoStatus === ''){
        return toast("Fields are not allowed to be empty", {
          autoClose: 1500,
          type:'error'
        }); // ToastOptions
      }
      if(this.repeatedTask !== -1){
      return toast("Duplicates are not allowed", {
        autoClose: 1500,
        type:'info'
      }); // ToastOptions
      }
      this.filteredTodos.push({
        todoText: this.todoText,
        todoStatus: this.todoStatus,
        done:false
      })
      localStorage.setItem('todos', JSON.stringify(this.filteredTodos));
      this.clearInputFields();
    },
    deleteTodo(todoTextToDelete) {
      this.filteredTodos = this.todos.filter(todo => todo.todoText !== todoTextToDelete);
      localStorage.setItem('todos', JSON.stringify(this.filteredTodos));
    },
    editTodo(todoTextToEdit){
      this.index = this.todos.findIndex((todo)=> todo.todoText === todoTextToEdit);
      this.editing = true
      if(this.index !== -1){
        this.todoText = this.todos[this.index].todoText
        this.todoStatus = this.todos[this.index].todoStatus
      }
    },
    updateTodo(){
        if(this.todos[this.index].todoText !== this.todoText){
          this.repeatedTask = -1
          this.todos[this.index].todoText = this.todoText
          this.todos[this.index].todoStatus = this.todoStatus
        }else{
          return
        }
        localStorage.setItem('todos', JSON.stringify(this.todos));
        this.clearInputFields();
        this.editing = false
    },
    handleInputBlur(){
      if (this.todoText.trim() === '' && this.editing) {
        this.editing = false
        this.todoStatus = "";
      }
    },
    handleSubmit(){
      if(this.editing){
        this.updateTodo()
      }else{
        this.addTodo()
      }
    },
    handleSelect(status){
      if(this.todos){
        this.todos.forEach(todo => {
        // Check if the todoStatus is 'Completed'
          if (todo.todoStatus === 'Completed') {
            // Update the 'done' property to true
            todo.done = true;
          }
          localStorage.setItem('todos', JSON.stringify(this.todos));
        });
      }

      switch (status) {
        case 'Completed':
          this.filteredTodos = this.todos.filter(({todoStatus})=> todoStatus === status)
          break;
        case 'Uncompleted':
          this.filteredTodos = this.todos.filter(({ todoStatus })=> todoStatus === 'Ongoing' || todoStatus === 'Todo' );
          break;
        default:
            this.filteredTodos = this.todos;
          break;
      }
    }
  }
}
</script>

<style>
body{
  margin: auto;
  background-color: #2c3e50;
  height: 100vh;
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  width: 90%;
  margin: 0 auto;
  color: white;
}
.todo-container{
    padding-top: 40px;
}
.input-div{
  display: flex;
}
.input-field{
  outline: none;
  border:2px solid #eee;
  width: 100%;
  padding: 10px;
}
.input-div button{
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  color: #2c3e50;
  font-weight: 600;
}
.status-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
}
.status-container .status-option label{
  margin-right: 10px;
}
.status-header{
  font-size: 20px;
  font-weight: 600;
  margin-right:10px;
}
.status-field{
  padding: 10px;
}

@media screen and (max-width: 550px) {
  .select-div{
    width: 100%;
  }
  .status-container{
    flex-direction: column;
  }
  .status-field{
    width: 100%;
    margin-top: 15px;
  }
  .status-header{
      font-size: 15px;
  }
}
</style>
