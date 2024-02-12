<template>
    <div class="todo-container">
    <h2>TODO List App</h2>
    <form @submit.prevent="handleSubmit">
      <div class="input-div">
        <input placeholder="Todo Item" @change="todoTextChange" @blur="handleInputBlur" :value="title" class="input-field" type="text"/>
        <button type="submit" v-if="editing">Update</button>
        <button type="submit" v-else>Submit</button>
      </div>
      <div class="status-container">
        <div class="status-option">
          <span class="status-header">Status:</span>
          <label>
            <input type="radio" value="Completed" v-model="status"/>
            <span>Completed</span>
          </label>
          <label>
            <input type="radio" value="Ongoing" v-model="status"/>
            <span>Ongoing</span>
          </label>
          <label>
            <input type="radio" value="Todo" v-model="status"/>
            <span>Todo</span>
          </label>
        </div>
        <!-- <div class="select-div">
          <select class="status-field" @change="handleSelect($event.target.value)">
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Uncompleted">Uncompleted</option>
          </select>
        </div> -->
      </div>
    </form>
      <TodoLists @edit-todo="editTodo"/>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
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
      title:"",
      status:"",
      editing:false,
      index:0,
      todos:[]
    }
  },
  mounted(){
    this.todos = this.$store.state.todos
  },
  methods:{
    ...mapActions(["addTodo","updateTodo"]),
    // ...mapGetters(["addTodos"]),
    clearInputFields(){
      this.title = ""
      this.status = ""
    },
    addTodoFx(){
      const duplicateTodo = this.todos.find(todo => todo.title === this.title);
      if (duplicateTodo) {
        toast("Duplicates aren't allowed", {
          autoClose: 1500,
          type: 'info'
        });
      }else if(this.title.trim() === '' || this.status.trim() === ''){
        return toast("No field is allowed to be empty", {
          autoClose: 1500,
          type: 'info'
        });
      }
      else{
      this.addTodo({
        title: this.title,
        status: this.status
      })
      this.clearInputFields()
      toast("Task added successfully", {
        autoClose: 1500,
        type:'success'
      });
      }
    },
    todoTextChange(e){
      this.title = e.target.value
    },
    editTodo(todoTextToEdit){
      this.index = this.todos.findIndex((todo)=> todo.title === todoTextToEdit);
      this.editing = true
      if(this.index !== -1){
          this.title = this.todos[this.index].title
          this.status = this.todos[this.index].status
      }
    },
    updateTodos(){
      this.todos[this.index].title = this.title
      this.todos[this.index].status = this.status
      this.updateTodo(this.todos[this.index])
      this.clearInputFields();
      this.editing = false
    },
    handleSubmit(todo){
      if(this.editing){
        this.updateTodos(todo)
      }else{
        this.addTodoFx()
      }
    },
    handleInputBlur(){
      if (this.title.trim() === '' && this.editing) {
        this.editing = false
        this.status = "";
      }
    },
  }
}
</script>

<style>
body{
  background: #242582;
  color: white;
  /* color: #f64c72; */
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
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
