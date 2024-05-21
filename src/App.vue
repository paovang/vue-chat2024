<template>
  <div class="chat">
    <div v-if="!joined">
      <form @submit.prevent="join">
        <label>What's your name?</label>
        <input v-model="name" />
        <button type="submit">Send</button>
      </form>
    </div>
      <div class="chat-container">
        <div class="message-container">
          <div v-for="message in messages" :key="message">
            [{{ message.name }}]: {{ message.text }}
          </div>
        </div>
        
        <div v-if="typingDisplay">{{ typingDisplay }}</div>
        <hr/>

        <div class="message-input">
          <form @submit.prevent="sendMessage">
            <label>Message:</label>
            <input v-model="messageText" @input="emitTyping" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
  </div>
  <hr/>
  <div>
    <button @click="getById(10)">Get One</button>
    <button @click="fetchData()">Get All</button>
    <button @click="createUser()">Create User</button>
    <button @click="userServiceGetAll()">User Service Get All</button>
  </div>
</template>

<script setup lang="ts">
  import { io } from 'socket.io-client';
  import { onMounted, onBeforeMount, ref } from 'vue';
  import { axiosConfig } from './axios/axios.config';
  import userUseCase  from './use-case/user.use-case';
  import { container } from 'tsyringe';
  import { UserService } from './services/users/user.service';

  const userService = container.resolve(UserService);

  const { getOne, getAll } = userUseCase;

  const socket = io('http://localhost:3001');
  const messages = ref([]);
  const messageText = ref('');
  const joined = ref(false);
  const name = ref('');
  const typingDisplay = ref('');

  const products = ref('');


  const userServiceGetAll = async () => {
    await userService.create('getAll');
  }

  const createUser = async () => {
    await userService.getAll('create');
  }

  const getById = async (id) => {
    await getOne(id);
  }

  const fetchData = async () => {
    await getAll();
  };

  onMounted(() => {
    fetchData();
  });

  onBeforeMount(() => {
    socket.emit('findAllMessages', {}, (response) => {
      messages.value = response;
    })

    socket.on('message', (response) => {
      messages.value.push(response);
    });

    socket.on('typing', ({ name, isTyping }) => {
       console.log(isTyping);
      if (isTyping) {
        typingDisplay.value = `${name} is typing...`;
      } else {
        typingDisplay.value = '';
      }
    })
  });

  const join = () => {
    socket.emit('join', { name: name.value }, () => {
      joined.value = true;
    });
  }

  const sendMessage = () => {
    socket.emit('createMessage', { text: messageText.value }, () => {
      messageText.value = '';
    })
  }

  let timeout;
  const emitTyping = () => {
    socket.emit('typing', { isTyping: true });
    timeout = setTimeout(() => {
      socket.emit('typing', { isTyping: false });
    }, 5000);
  }

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

