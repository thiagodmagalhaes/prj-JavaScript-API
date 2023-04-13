<template>
  <div>
    <div class="row">
      <div class="col-4" v-for="(user, index) in users" :key="user.login.uuid">
        <div class="card" style="width: 18rem;">
          <img :src="user.picture.large" class="card-img-top" alt="User Image">
          <div class="card-body">
            <h5 class="card-title">{{ user.name.first }} {{ user.name.last }}</h5>
            <p class="card-text">Data de nascimento: {{ user.dob.date }}</p>
            <p class="card-text">Telefone: {{ user.phone }}</p>
            <button class="btn btn-primary" @click="showUser(index)">VIEW</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-if="selectedUser">
      <div class="col-4">
        <div class="card" style="width: 18rem;">
          <img :src="selectedUser.picture.large" class="card-img-top" alt="User Image">
          <div class="card-body">
            <h5 class="card-title">{{ selectedUser.name.first }} {{ selectedUser.name.last }}</h5>
            <p class="card-text">Telefone(fixo): {{ selectedUser.phone }}</p>
            <p class="card-text">Telefone(móvel): {{ selectedUser.cell }}</p>
            <p class="card-text">Data Nascimento: {{ selectedUser.dob.date }}</p>
            <p class="card-text">Sexo: {{ selectedUser.gender }}</p>
            <button class="btn btn-primary" @click="selectedUser = null">CLOSE</button>
          </div>
        </div>
      </div>
    </div>

    <button class="btn btn-primary" @click="addUser">ADD</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

export default {
  name: 'App',
  setup() {
    const users = ref([]);
    const selectedUser = ref(null);
    const page = ref(1);

    const fetchUsers = (results, page) => {
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
