<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.login.uuid">
        {{ user.name.first }} {{ user.name.last }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

export default {
  name: 'App',
  setup(){
    const users = ref([]);
    const fetchUsers = () =>  {
      api.get("https://api.randomuser.me/?results=3")
         .then((response) => {
           users.value = response.data.results;
           console.log(response);
         })
         .catch((error) => {
           console.error(error);
         });
    };
    onMounted(fetchUsers);

    return {
      users
    }
  }
}
</script>

<style>
/* Estilo do seu componente aqui */
</style>