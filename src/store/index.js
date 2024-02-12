import { createStore } from 'vuex';

export default createStore({
  state: {
    todos:[
      {
        id:1,
        title:'First domant data',
        status:'Completed'
      }
    ]
  },
  getters: {
    allTodos:(state)=>state.todos
  },
  actions: {
    addTodo({commit},todo){
      commit('add_todo',todo)
    },
    deleteTodo({commit},title){
      commit("delete_todo",title)
    },
    updateTodo({commit},todo){
      commit("delete_todo",todo)
    },
  },
  mutations: {
    add_todo(state,todo){
      state.todos.push(todo)
    },
    delete_todo(state,title){
      state.todos = state.todos.filter((todo)=>todo.title !== title)
    },
    update_todo(state,todo){
      let index = state.todos.findIndex((currentTodo)=>currentTodo.title === todo.title)
      if(index !== -1){
        state.todos[index] = todo
      }
    }
  },
  modules: {
  }
})
