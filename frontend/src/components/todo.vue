<template lang="html">
  <b-row id="todo">
    <b-col sm="2" class="pl-0">
      <sidemenu id="sidemenu"></sidemenu>
    </b-col>
    <b-col sm="10" class="content">
      <h1>To Do List</h1>
      <b-form  @submit.prevent="createTodo()" >
        <b-form-group label="To Do:" label-for="input1" description="Add a todo to your list.">
          <b-form-input id="input1" type="text" v-model="todo.title" placeholder="todo">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Add Item</b-button>
      </b-form>
      <br>
      <b-list-group>
        <b-list-group-item v-for="item in todos" :key="item.id">
          <b-form-checkbox class="checkbox-center"></b-form-checkbox>
          {{ item.title }}
        </b-list-group-item>
      </b-list-group>
      <!-- <b-form-group>
        <b-form-checkbox-group v-for="item in todos" :key="item.title">
          {{ item.title }}
        </b-form-checkbox-group>
      </b-form-group> -->
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

  fetchTodos() {
    console.log('loading items')
    this.store.findAll().then((todos) => {
      console.log(todos)
      this.todos = todos
    })
    // }).catch(err) => {
    //   this.hoodie.log(err)
    // }
  }
  
  created() {
    this.fetchTodos();
  }
}
</script>

<style lang="scss">
  .checkbox-center {
    min-height: 1.1rem;
  }
</style>
