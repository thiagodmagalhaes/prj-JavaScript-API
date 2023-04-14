<template>
  <div>
    <div class="row">
      <div class="col-4" v-for="(user, index) in users" :key="user.login.uuid">
        <div class="card" style="width: 18rem;">
          <img :src="user.picture.large" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ user.name.first }} {{ user.name.last }}</h5>
            <p class="card-text">
              <strong>Data de nascimento:</strong> {{ user.dob.date }}
              <br>
              <strong>Telefone:</strong> {{ user.phone }}
            </p>
            <button class="btn btn-primary" @click="showUser(index)">VIEW</button>
          </div>
        </div>
      </div>
    </div>

      <body>
    <section class="container">
      <div class="card">
        <div class="image">
          <img src="images/img1.jpg" alt="" />
        </div>
        <h2>Someone Name</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elite.</p>
      </div>
    </section>
  </body>
  <section class="container">
    <div class="row">
      <div class="col-4" v-for="user in users" :key="user.login.uuid">
        <div class="card" style="width: 18rem;">
          <img :src="user.picture.large" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ user.name.first }} {{ user.name.last }}</h5>
            <p class="card-text">
              <strong>Data de nascimento:</strong> {{ user.dob.date }}
              <br>
              <strong>Telefone:</strong> {{ user.phone }}
            </p>
            <button class="btn btn-primary" @click="showUser(user)">VIEW</button>
          </div>
        </div>
      </div>
    </div>
  </section>

    <div v-if="selectedUser" class="overlay">
      <div class="card overlay-content">
        <div class="card-header">
          <h5 class="card-title">{{ selectedUser.name.first }} {{ selectedUser.name.last }}</h5>
          <button class="close"  @click="selectedUser = null">FECHAR</button>
        </div>
        <div class="card-body">
          <p><strong>Telefone(fixo):</strong> {{ selectedUser.phone }}</p>
          <p><strong>Telefone(móvel):</strong> {{ selectedUser.cell }}</p>
          <p><strong>Data Nascimento:</strong>{{ selectedUser.dob.date.slice(0, 10) }}</p>
          <p><strong>Sexo:</strong> {{ selectedUser.gender }}</p>
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
.overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.overlay-content {
  background-color: #fff;
  max-width: 500px;
  max-height: 80%;
  overflow: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}


</style>