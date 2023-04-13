<template>
  <div>
    <ul>
      <li v-for="(user, index) in users" :key="user.login.uuid">
        <div>
          <img :src="user.picture.large" />
          <div>
            <p><strong>Nome:</strong> {{ user.name.first }} {{ user.name.last }}</p>
            <p><strong>Data de nascimento:</strong> {{ user.dob.date}}</p>
            <p><strong>Telefone:</strong> {{ user.phone}}</p>
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
    <button @click="addUser">ADD</button>
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
    const page = ref(1);
    const fetchUsers = (results, page) =>  {
      api.get(`https://api.randomuser.me/?results=${results}&page=${page}`)
         .then((response) => {
           users.value = users.value.concat(response.data.results);
           console.log(response);
         })
         .catch((error) => {
           console.error(error);
         });
    };
    const addUser = () => {
      fetchUsers(3, page.value);
      page.value += 1;
    };
    const showUser = (index) => {
      selectedUser.value = users.value[index];
    };
    onMounted(() => {
      fetchUsers(3, page.value);
      page.value += 1;
    });

    return {
      users,
      selectedUser,
      showUser,
      addUser
    }
  }
}
</script>

<style>
/* Estilo do seu componente aqui */
</style>
