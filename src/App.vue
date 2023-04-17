<template>
  <div>
    <section class="container">
      <div class="row">
        <div class="col-sm-3 col-12">
          <div class="card cardTrasparente mb-3">
            <button class="botaoADD" @click="addUser"><i class="fas fa-plus plus configIcone"></i></button>
          </div>
        </div>

        <div class="col-sm-3 col-12" v-for="(user, index) in users.reverse()" :key="user.login.uuid">
          <div class="card m-10 mb-3">
            <i v-if="verificaSexo(user,)" class="fa fa-venus iconeSex m-10 mb-3"></i>
            <i v-else class="fa fa-mars iconeSex m-10 mb-3"></i>
            <img :src="user.picture.large" class="fotoredonda " alt="...">
            <div class="card-body row">
              <div class="col-12 d-flex justify-content-center" style="white-space: nowrap">{{ user.name.first }} {{
                user.name.last }}</div>
              <div class="col-12 ajusteData d-flex justify-content-center "><strong>{{ user.dob.date }}</strong></div>
              <div class="col-12 ajusteTel text-center" style="white-space: nowrap;"><strong>{{ user.phone }}</strong>
              </div>
              <button class="btn btn-primary botaoVIEW rounded-pill" @click="showUser(index)" data-toggle="modal"
                data-target="#myModal">VIEW</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content inserirborda">
          <div class="rowNEW">
            <div class="row">
              <div class="col-1">
                <button type="button" class="fas fa-angle-left iconeVoltar fa-3x" style="float: left;"
                  data-dismiss="modal"></button>
              </div>
              <div class="col-10">
                <h5 class="text-center white mt-3" style="color: white;">View Profile</h5>
              </div>
              <div class="col-1">
                <div class="fas fa-plus plus iconeMais fa-2x m-2" style="float: right;"></div>
              </div>
            </div>
            <div class="row">
              <div calss="col-12"><img :src="selectedUser?.picture.large" class="fotoredondaVIEW" alt="..."> </div>
            </div>
            <div class="row">
              <div class="col-12 d-flex justify-content-center" style="white-space: nowrap ; color:white">
                <h4>{{ selectedUser?.name.first }} {{
                  selectedUser?.name.last }}</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-12 d-flex justify-content-center" style="white-space: nowrap">
                <h6>{{ selectedUser?.location.city }},{{
                  selectedUser?.location.state }}</h6>
              </div>
            </div>



          </div>


          <div class="modal-body">
            <div class="row ">
              <p style="color: rgb(26,13,179) ;">Email</p><br><p style="margin-top: -15px;">{{ selectedUser?.email }}</p>
            </div>
            <div class="row ">
              <hr>
              <p style="color: rgb(26,13,179); margin-top: -15px;">Tel</p><br><p style="margin-top: -15px;">{{ selectedUser?.phone }}</p>
            </div>
            <div class="row ">
              <hr>
              <p style="color: rgb(26,13,179); margin-top: -15px;">Cell</p><br><p style="margin-top: -15px;">{{ selectedUser?.cell }}</p>
            </div>
            <div class="row ">
              <hr>
              <p style="color: rgb(26,13,179); margin-top: -15px;">Data de nascimento</p><br><p style="margin-top: -15px;">{{ selectedUser?.dob.date }}</p>
            </div>
          </div>
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



    function verificaSexo(user) {
      if (user.gender === 'female') {
        return true;
      } else {
        return false;
      }
    }



    const fetchUsers = (results, page) => {


      api.get(`https://api.randomuser.me/?results=${results}&page=${page}`)
        .then((response) => {
          response.data.results.forEach((user) => {
            user.dob.date = formatarData(user.dob.date);
            user.phone = formatarTelefone(user.phone);
            user.cell = formatarTelefone(user.cell);


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
      verificaSexo,
      showUser,
      addUser
    }
  }
}
</script>

<style>
.iconeVoltar {
  background-color: rgb(101,210,242);
  border: 1px solid rgb(101,210,242);
  color: rgb(255, 255, 255);

}

.iconeMais {
  color: rgb(255, 255, 255);
}

.rowNEW {
  background-color: rgb(101,210,242) !important;

}

.inserirborda {
  border: 2px solid #000;
  /* adiciona uma borda sólida de 1 pixel de largura na cor preta */
}

.ajusteNome {
  white-space: nowrap;
}

.card {
  height: 400px !important;
}

.cardTrasparente {
  height: 400px !important;
  background-color: rgba(47, 228, 252, 0) !important;


}

.botaoVIEW {
  padding: 15px;
  background-color: rgba(217, 155, 241, 0.5) !important;
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
  margin-top: -19px !important;
}

.fotoredonda {
  border-radius: 100%;

}

.fotoredondaVIEW {
  border-radius: 100%;
  height: 300px;
  position: relative;
  /* define o posicionamento relativo */
  left: 90px;
  /* move a imagem 50 pixels para a direita */
  top: 0px;
  border: 2px solid rgb(255, 255, 255);


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



}</style>