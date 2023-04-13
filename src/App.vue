<template>
  <div>
    <ul>
      <li v-for="(user, index) in users" :key="user.login.uuid">
        <div>
          <img :src="user.picture.large" />
          <div>
            <p><strong>Nome:</strong> {{ user.name.first }}</p>
            <p><strong>Sobrenome:</strong> {{ user.name.last }}</p>
            <button @click="showUser(index)">VIEW</button>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="selectedUser">
      <h2>{{ selectedUser.name.first }} {{ selectedUser.name.last }}</h2>
      <p><strong>Telefone(fixo):</strong> {{ selectedUser.phone }}</p>
      <p><strong>Telefone(móvel):</strong> {{ selectedUser.cell }}</p>
      <p><strong>Data Nascimento:</strong> {{ selectedUser.dob.date }}</p>
      <p><strong>Sexo:</strong> {{ selectedUser.gender }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

export default {
  name: 'App',
  setup(){
    const users = ref([]);
    const selectedUser = ref(null);
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
    const showUser = (index) => {
      selectedUser.value = users.value[index];
    };
    onMounted(fetchUsers);

    return {
      users,
      selectedUser,
      showUser
    }
  }
}
</script>

<style>
/* Estilo do seu componente aqui */
</style>
