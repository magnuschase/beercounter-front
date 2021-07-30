<template>
  <div>
    <div class="container mx-auto h-full pt-20">
      <!-- HEADER -->
      <h2 class="text-3xl font-bold text-yellow-400 text-center uppercase">
        Hall Of Fame
      </h2>
      <div class="w-full flex flex-row flex-wrap justify-center mt-4">
        <div class="flex justify-center" v-for="user in users" :key="user._id">
          <FamePost :post="user" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FamePost from "../components/FamePost.vue";

export default {
  middleware: "auth",
  components: { FamePost },
  data: () => {
    return {
      users: [],
    };
  },
  async fetch() {
    this.users = await axios
      .post("https://piwo.tech/get/fame")
      .then((res) => res.data);
    await this.users.sort((a, b) => (a.season > b.season ? 1 : -1));
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
  font-family: "Roboto Mono", sans-serif;
  font-size: 2rem;
  margin-top: 10px;
  margin-bottom: 10px;
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}
.mainButton:hover {
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}

.bg-special {
  background-color: #040f0f;
}

.text-xxs {
  font-size: 0.65rem;
}
</style>