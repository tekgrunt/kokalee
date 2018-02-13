<template lang="html">
  <b-row id="todo">
    <b-col md="2" class="pl-0">
      <sidemenu id="sidemenu"></sidemenu>
    </b-col>
    <b-col md="10" class="content">
      <div class="todo-input">
        <b-input-group>
          <b-form-input v-model="todo.title"  @keydown.enter.native="createTodo()" placeholder="What's on your list to do?"></b-form-input>
          <b-input-group-append>
            <b-btn @click.prevent="createTodo()" variant="primary" type="submit">Add Todo</b-btn>
          </b-input-group-append>
        </b-input-group>
      </div>
      <br>
      <b-form-group v-if="todos.length >= 1" label="Todo List" description="Click on a todo to edit.">
       <b-input-group v-for="todo in todos" :key="todo.id" id="todo-group">
         <b-check v-model="todo.completed" @change="checkboxToggle(todo)" class="checkbox-center"></b-check>
         <b-form-input @keydown.enter.native="updateTodo(todo)" v-model="todo.title" :placeholder="todo.title" id="form-input"></b-form-input>
         <b-input-group-append>
           <b-btn @click="updateTodo(todo)" variant="outline-info" size="sm">Save</b-btn>
        </b-input-group-append>
        <b-input-group-append>
          <b-btn @click="deleteTodo(todo)" variant="outline-danger" size="sm">Delete</b-btn>
       </b-input-group-append>
       </b-input-group>
     </b-form-group>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
import app from '../util/app'
import hoodie from '../util/hoodie'

export interface Todo {
  title: string
  completed: boolean
}

@Component({})

export default class TodoComponent extends Vue {
  protected hoodie = hoodie;
  protected store = hoodie.store.withIdPrefix('todo');
  todo: Todo = {title: '', completed: false};
  todos: Todo[] = [];

  createTodo() {
    const title = this.todo.title.trim();
    this.store.add({
      title,
      completed: false,
    }).then((response) => {
      console.log('todo:', response)
      this.fetchTodos();
    })
    this.todo.title = ''
  }

  // once several todos are added, they don't get added in sequence.
  fetchTodos() {
    console.log('loading items')
    this.store.findAll().then((todos) => {
      console.log(todos)
      this.todos = todos
    }).catch((err) => {
      this.hoodie.log(err)
    })
  }

  deleteTodo(todo) {
    this.store.remove(todo).then((response) => {
      console.log(response);
      this.fetchTodos();
    })
  }

  // would be nice to add a strikethrough for the todo.title if todo is completed
  checkboxToggle(todo) {
    const id = todo._id
    const completed = !todo.completed
    this.store.update(id, {
      completed: completed
    })
    console.log(todo)
  }

  updateTodo(todo) {
   const id = todo._id
   const title = todo.title
   this.store.update(id, {
     title: title
   }).then((response) => {
     console.log(response);
     this.fetchTodos();
   })
 }

  created() {
    this.fetchTodos();
  }
}
</script>

<style lang="scss">

</style>
