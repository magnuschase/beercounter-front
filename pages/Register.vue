<template>
  <div>
    <!-- <h1>Login</h1>
    <input type="text" name="name" v-model="username" />
    <input type="password" name="password" v-model="password" />
    <button @click="click">SUBMIT</button> -->
    <div
      class="
        max-w-sm
        mx-auto
        rounded-lg
        shadow-xl
        overflow-hidden
        p-6
        space-y-10
      "
    >
      <h2 class="text-3xl font-bold text-yellow-400 text-center">
        ZAREJESTRUJ SIĘ
      </h2>
      <div class="outline relative border-2 focus-within:border-green-500">
        <input
          type="text"
          name="username"
          v-model="username"
          class="
            block
            p-4
            w-full
            text-lg
            appearance-none
            focus:outline-none
            bg-transparent
          "
        />
        <label
          for="username"
          class="
            absolute
            top-0
            text-lg
            bg-transparent
            p-4
            -z-1
            duration-300
            origin-0
          "
          >Username</label
        >
      </div>
      <div class="outline relative border-2 focus-within:border-green-500">
        <input
          type="password"
          name="password"
          v-model="password"
          class="
            block
            p-4
            w-full
            text-lg
            appearance-none
            focus:outline-none
            bg-transparent
          "
        />
        <label
          for="password"
          class="
            absolute
            top-0
            text-lg
            bg-transparent
            p-4
            -z-1
            duration-300
            origin-0
          "
          >Password</label
        >
      </div>
      <div class="outline relative border-2 focus-within:border-green-500">
        <input
          type="text"
          name="passphrase"
          v-model="passphrase"
          class="
            block
            p-4
            w-full
            text-lg
            appearance-none
            focus:outline-none
            bg-transparent
          "
        />
        <label
          for="passphrase"
          class="
            absolute
            top-0
            text-lg
            bg-transparent
            p-4
            -z-1
            duration-300
            origin-0
          "
          >Kod dostępu</label
        >
      </div>
      <button class="mainButton" @click="click">POTWIERDZ</button>
      <NuxtLink to="/login">
        <button class="mainButton">CHCE SIE ZALOGOWAC</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => {
    return {
      username: "",
      password: "",
      passphrase: "",
    };
  },
  methods: {
    click: async function () {
      console.log(process.env.VUE_APP_PASSPHRASE);
      let userData = {
        name: this.username,
        password: this.password,
      };
      if (userData.name.length < 20) {
        if (userData.name != "" && userData.password != "") {
          if (this.passphrase == process.env.VUE_APP_PASSPHRASE) {
            try {
              await axios
                .post("https://piwo.tech/add/user", userData)
                .then((res) => {
                  this.$swal.fire(
                    "Zostałeś zarejestrowany. Teraz możesz się zalogować"
                  );
                  this.$router.push("/");
                });
            } catch (err) {
              console.log(err);
              this.$swal.fire("Nazwa użytkownika jest już zajęta");
            }
          } else {
            this.$swal.fire("Zły kod dostępu!");
          }
        } else this.$swal.fire("Nieprawidłowe dane!");
      } else this.$swal.fire("Za długi login! Maksymalna ilość znaków: 20");
    },
  },
};
</script>

<style lang="postcss" scoped>
.outline input:focus-within ~ label,
.outline input:not(:placeholder-shown) ~ label {
  @apply transform scale-75 -translate-y-7 z-0 px-1 py-0;
}
.mainButton {
  width: 100%;
  color: $light;
  font-weight: 400;
  font-family: "Roboto Mono", sans-serif;
  font-size: 2rem;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 5px solid #f7ca18;
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}
.mainButton:hover {
  color: $dark;
  background-color: #f7ca18;
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}
</style>