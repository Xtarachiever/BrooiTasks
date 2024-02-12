<template>
  <div>
    <div v-for="todo in todos" :key="todo.todoText" class="todo">
      <p :class="['todo-text', todo.todoStatus]">{{todo.todoText}}</p>
      <div class="todo-status">
        <span>{{todo.todoStatus}}</span>
        <v-icon name="ri-edit-2-line" scale="1.5" class="icon edit_icon" @click="editTodo(todo.todoText)" />
        <v-icon name="md-deleteoutline-round" scale="1.5" @click="deleteTodo(todo.todoText)" class="icon"/>
      </div>
    </div>
  </div>
</template>

<script>
import OhVueIcon from "oh-vue-icons";
export default {
  props:['todos'],
  components: {
    "v-icon": OhVueIcon
  },
  methods:{
    // toggleEdit(){
    //   this.editing = !this.editing
    // },
    deleteTodo(todoTextToDelete) {
      this.$emit('delete-todo', todoTextToDelete);
    },
    editTodo(todoTextToEdit){
      this.$emit('edit-todo', todoTextToEdit)
    }
  }
}
</script>

<style>
.icon{
  cursor: pointer;
}
.todo{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
}
.todo .todo-status .edit_icon{
  margin: 0px 5px;
}
.todo-text{
  font-weight: 600;
}
.Completed{
  color: #90f64c;
  text-decoration: line-through;
}
@media screen and (max-width: 550px) {
  .todo{
    flex-direction: column;
  }
}
</style>