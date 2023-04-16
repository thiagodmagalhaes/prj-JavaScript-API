<template>
  <div>
    <section class="container">
      <div class="row">
        <div class="col-sm-3 col-12">
          <div class="card cardTrasparente mb-3">
            <button class="botaoADD" @click="addUser"><i class="fas fa-plus plus configIcone"></i></button>
          </div>
        </div>

        <div class="col-sm-3 col-12" v-for="(user, index) in users" :key="user.login.uuid">
          <div class="card m-10 mb-3">
            <i class="fa fa-mars iconeSex m-10 mb-3"></i>
            <img :src="user.picture.large" class="fotoredonda " alt="...">
            <div class="card-body">
              <div class="col-12 d-flex justify-content-center" style="white-space: nowrap">{{ user.name.first }} {{ user.name.last }}</div>
              <div class="col-12 ajusteData d-flex justify-content-center "><strong>{{ user.dob.date }}</strong></div>
              <div class="col-12 ajusteTel" style="white-space: nowrap;"><strong>{{ user.phone }}</strong></div>
              <button class="btn btn-primary botaoVIEW" @click="showUser(index)">VIEW</button>
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
    function formatarTelefone(numero) {
      // Remove todos os caracteres não numéricos do número original
      let numeroLimpo = numero.replace(/\D/g, '');
      // Divide o número em seções
      let secao1 = numeroLimpo.slice(0, 2);
      let secao2 = numeroLimpo.slice(2, 7);
      let secao3 = numeroLimpo.slice(7, 11);
      // Adiciona as seções ao novo formato
      let telefoneFormatado = `(${secao1}) ${secao2}-${secao3}`;
      return telefoneFormatado;
    }

    const fetchUsers = (results, page) => {
      api.get(`https://api.randomuser.me/?results=${results}&page=${page}`)
        .then((response) => {
          response.data.results.forEach((user) => {
            user.dob.date = formatarData(user.dob.date);
            user.phone = formatarTelefone(user.phone);
          });
          users.value = users.value.concat(response.data.results);
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const formatarData = (data) => {
      const dateOriginal = new Date(data);
      const dia = dateOriginal.getDate();
      const mes = dateOriginal.getMonth() + 1;
      const ano = dateOriginal.getFullYear();
      return `${dia}/${mes}/${ano}`;
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

.ajusteNome{
  white-space: nowrap;
}
.card {
  height: 400px !important;
}

.cardTrasparente {
  height: 400px !important;
  background-color: rgba(255, 255, 255, 0) !important;


}

.botaoVIEW{
  padding: 15px;
  background-color:rgba(217, 155, 241, 0.5) !important;
  border-color: transparent !important;
  width: 200px;
}
.iconeSex {
  font-size: 40px;
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 5px;
}

.ajusteData {
  padding: 15px;
}

.ajusteTel {
  padding: 10px;
  white-space: nowrap;
}

.fotoredonda {
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

.botaoADD {
  border-radius: 100%;
  padding: 40px;
  border: 2px solid rgba(134, 130, 130, 0.445);
  font-weight: 100;

}

.configIcone {
  background-color: rgba(255, 255, 255, 0);
  font-size: 60px;
  color: rgba(217, 155, 241, 0.5);



}
</style>