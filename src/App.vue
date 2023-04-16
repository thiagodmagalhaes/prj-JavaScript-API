<template>
  <div>
    <section class="container">
      <div class="row">
        <div class="col-sm-3 col-12">
          <div class ="card cardTrasparente mb-3">
            <button class="botaoADD" @click="addUser"><i class="fas fa-plus plus configIcone"></i></button>
          </div>
        </div>

        <div class="col-sm-3 col-12" v-for="(user, index) in users" :key="user.login.uuid">
          <div class="card m-10 mb-3">
            <i class="fa fa-mars test m-10 mb-3"></i>
            <img :src="user.picture.large" class="fotoredonda " alt="...">
            <div class="card-body">
              <div class="col-12 d-flex justify-content-center">{{ user.name.first }} {{ user.name.last }}</div>
             
              <p class="card-text">
                <strong>Data de nascimento:</strong> {{ user.dob.date.slice(0, 10) }}
                <br>
                <strong>Telefone:</strong> {{ user.phone }}
              </p>
              <button class="btn btn-primary" @click="showUser(index)">VIEW</button>
            </div>
          </div>
        </div>
      </div>
    </section>


    <div v-if="selectedUser" class="overlay">
      <div class="card overlay-content">
        <div class="card-header">
          <img :src="selectedUser.picture.large" class="card-img-top" alt="...">
          <h5 class="card-title">{{ selectedUser.name.first }} {{ selectedUser.name.last }} </h5>
          <button class="close" @click="selectedUser = null">FECHAR</button>
        </div>
        <div class="card-body">
          <p><strong>Telefone(fixo):</strong> {{ selectedUser.phone }}</p>
          <p><strong>Telefone(móvel):</strong> {{ selectedUser.cell }}</p>
          <p><strong>Data Nascimento:</strong>{{ selectedUser.dob.date.slice(0, 10) }}</p>
          <p><strong>Sexo:</strong> {{ selectedUser.gender }}</p>
          <p><strong>Localização:</strong> {{ selectedUser.location.city }}, {{ selectedUser.location.state }}</p>
          <p><strong>Email:</strong> {{ selectedUser.email }}</p>
        </div>
      </div>
    </div>


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

.card{
  height: 400px !important;
}

.cardTrasparente{
  height: 400px !important;
  background-color: rgba(255, 255, 255, 0) !important;
 
  
}
.test{
  font-size: 40px;
  position: absolute;
  top:0;
  right: 0;
  margin-right: 5px;
}

.fotoredonda{
  border-radius: 100%;

}
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
  background-color: #ffffff;
  max-width: 500px;
  max-height: 80%;
  overflow: auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
.botaoADD{
  border-radius: 100%;
  padding: 40px;
  border: 2px solid rgba(134, 130, 130, 0.445) ;
  font-weight: 100;
  
}

.configIcone{
  background-color: rgba(255, 255, 255, 0);
  font-size: 60px;
  color: rgba(217, 155, 241, 0.5);
  
  
 
}

</style>