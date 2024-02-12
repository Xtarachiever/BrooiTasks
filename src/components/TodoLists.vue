<template>
  <div v-for="todo in allTodos" :key="todo.todoText">
    <p>{{todo.title}}</p>
    <div>
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

</style>