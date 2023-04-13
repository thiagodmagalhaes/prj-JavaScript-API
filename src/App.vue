<template>
  <div>
    <ul>
      <li v-for="user in users" :key="user.login.uuid">
        <div>
          <img :src="user.picture.large" />
          <div>
            <p><strong>Nome:</strong> {{ user.name.first }}</p>
            <p><strong>Sobrenome:</strong> {{ user.name.last }}</p>
            <p><strong>Telefone(fixo):</strong> {{ user.phone }}</p>
            <p><strong>Telefone(móvel):</strong> {{ user.cell }}</p>
            <p><strong>Data Nascimento:</strong> {{ user.dob.date }}</p>
            <p><strong>Sexo:</strong> {{ user.gender }}</p>
          </div>
        </div>
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