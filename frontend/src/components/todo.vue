<template lang="html">
  <b-row id="todo">
    <b-col md="2" class="pl-0">
      <sidemenu id="sidemenu"></sidemenu>
    </b-col>
    <b-col md="10" class="content">
      <h2 class="text-center">To Do List</h2>
      <div class="todo-input">
        <b-input-group>
          <b-form-input v-model="todo.title" placeholder="What's on your list to do?"></b-form-input>
          <b-input-group-append>
            <b-btn @click.prevent="createTodo()" variant="primary" type="submit">Add Todo</b-btn>
          </b-input-group-append>
        </b-input-group>
      </div>
      <br>
      <b-list-group class="">
        <b-list-group-item v-for="todo in todos" :key="todo.id">
          <b-form-checkbox v-model="todo.completed" @change="checkboxToggle(todo)" class="checkbox-center"></b-form-checkbox>
          {{ todo.title }}
          <b-btn @click="deleteTodo(todo)" class="float-right" size="sm" variant="outline-danger">Delete</b-btn>
        </b-list-group-item>
      </b-list-group>
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
    const completed = !this.todo.completed
    this.store.update(id, {
      completed: completed
    })
    console.log(todo)
  }
  
  created() {
    this.fetchTodos();
  }
}
</script>

<style lang="scss">

</style>
