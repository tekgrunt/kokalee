<template lang="html">
  <b-row id="todo">
    <b-col sm="2" class="pl-0">
      <sidemenu id="sidemenu"></sidemenu>
    </b-col>
    <b-col sm="10" class="content">
      <h1>To Do List</h1>
      <b-form>
        <b-form-group label="To Do:" label-for="input1" description="Add a todo to your list.">
          <b-form-input id="input1" type="text" v-model="todo.title" placeholder="todo">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
      <br>
      <b-list-group>
        <b-list-group-item v-for="item in todos" :key="item">
          {{ item }}
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
  todo: Todo = {title: '', completed: false}
  todos: string[] = this.fetchTodos()
  
  createTodo() {
    
  }
  
  fetchTodos() {
    return ['Todo!']
    // hoodie.store.findAll()
  }
}
</script>

<style lang="scss">
</style>
