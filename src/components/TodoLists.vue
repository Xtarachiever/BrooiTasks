<template>
  <div v-for="(todo,index) in allTodos" :key="todo.todoText" class="todo-list">
    <div :class="[ 'todo-title', todo.status ]">
        <span>{{index+1}}.</span>
        <p>{{todo.title}}</p>
    </div>
    <div class="todo-status">
        <span>{{todo.status}}</span>
        <v-icon name="ri-edit-2-line" scale="1.5" class="icon edit_icon" @click="editTodo(todo.title)" />
        <v-icon name="md-deleteoutline-round" scale="1.5" @click="handleDeleteFx(todo.title)" class="icon"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import OhVueIcon from "oh-vue-icons";
import { toast } from 'vue3-toastify'

export default {
    props:['index'],
    components: {
        "v-icon": OhVueIcon
    },
    computed:{
        ...mapGetters(["allTodos"])
    },
    methods:{
        ...mapActions(["deleteTodo"]),
        editTodo(todoTextToEdit){
            this.$emit('edit-todo', todoTextToEdit)
        },
        handleDeleteFx(todo){
            this.deleteTodo(todo)
            return toast("Task successfully deleted", {
                autoClose: 1500,
                type:'success'
            });
        }
    }
}
</script>

<style>
.todo-list,
.todo-status,
.todo-title{
    display: flex;
    align-items: center;
}
.Completed{
    text-decoration: line-through;
    color: #d5d5d5;
}
.todo-title span{
    margin-right: 10px;
}
.todo-list{
    justify-content: space-between;
}
.icon{
    cursor: pointer;
}
.icon:hover{
    color: #f64c72;
}
.edit_icon{
    margin: 0px 10px;
}
@media screen and (max-width:400px) {
    .todo-list{
        flex-direction: column;
    }
}
</style>