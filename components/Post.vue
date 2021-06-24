<template>
  <div class="h-72 w-72 rounded-b-3xl bg-green-900 my-4 mx-4 relative">
    <div class="absolute top-8 left-4 w-28 h-28 rounded-full bg-green-900" />
    <img
      class="absolute top-8 left-4 w-28 h-28 rounded-full opacity-90"
      :src="post.imgLink"
    />
    <div class="h-16 py-2 px-2 relative">
      <span
        class="
          absolute
          top-2
          left-2
          font-bold
          text-xs text-yellow-400
          mr-4
          opacity-60
          select-none
        "
        >{{ post.score }}/5</span
      >
      <div class="h-18 w-full font-bold text-right text-yellow-400 uppercase">
        <NuxtLink :to="{ path: 'profile', query: { username: post.who } }">{{
          post.who
        }}</NuxtLink>
      </div>
      <div class="h-18 w-full text-xs text-right text-yellow-400 font-medium">
        {{ post.date.formatted }}
      </div>
    </div>
    <div class="h-56 bg-special border-2 rounded-b-3xl border-green-900">
      <div class="h-28 w-full relative">
        <NuxtLink :to="{ path: 'beer', query: { beername: post.beer } }">
          <div
            class="absolute left-36 max-h-28 flex justify-start flex-wrap mt-1"
          >
            <div class="flex flex-col mr-4">
              <div class="text-yellow-400 font-bold">ALC</div>
              <div class="text-xxs font-medium">{{ post.voltage }}%</div>
            </div>
            <div class="flex flex-col">
              <div class="text-yellow-400 font-bold">POJEMNOŚĆ</div>
              <div class="text-xxs font-medium">{{ post.volume }}ml</div>
            </div>
            <div class="flex flex-col mt-1">
              <div class="text-yellow-400 font-bold">NAZWA PIWA</div>
              <div class="text-xxs font-medium">
                {{ post.beer }}
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div class="w-full flex flex-col">
        <div class="flex flex-col h-full px-4">
          <div class="text-xs h-12">Opis: {{ post.desc }}</div>
          <div class="mt-2 flex justify-end items-center">
            <NuxtLink
              v-if="
                this.$auth.user.data.username == post.who ||
                this.$auth.user.admin
              "
              :to="{ path: '/edit/post', query: { id: post._id } }"
            >
              <button
                class="
                  inline-flex
                  items-center
                  justify-center
                  w-8
                  h-8
                  mr-4
                  text-green-100
                  transition-colors
                  duration-150
                  bg-green-700
                  rounded-full
                  focus:shadow-outline
                  hover:bg-green-800
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"
                  />
                </svg>
              </button>
            </NuxtLink>
            <div class="relative cursor-pointer" @click="like(post._id)">
              <button
                class="
                  inline-flex
                  items-center
                  justify-center
                  w-8
                  h-8
                  text-green-100
                  transition-colors
                  duration-150
                  bg-green-700
                  rounded-full
                  focus:shadow-outline
                  hover:bg-green-800
                "
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <span class="font-bold absolute left-5 top-4 text-yellow-400">{{
                post.likes.length
              }}</span>
            </div>
            <NuxtLink :to="{ path: 'post', query: { id: post._id } }">
              <div class="ml-2 relative cursor-pointer">
                <button
                  class="
                    inline-flex
                    items-center
                    justify-center
                    w-8
                    h-8
                    ml-2
                    text-green-100
                    transition-colors
                    duration-150
                    bg-green-700
                    rounded-full
                    focus:shadow-outline
                    hover:bg-green-800
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 1c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 9.236 2.247 15.968-3.405 15.968-9.457 0-5.812-5.701-10.007-12-10.007zm-5 11.5c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5 1.5.671 1.5 1.5-.671 1.5-1.5 1.5zm5 0c-.829 0-1.5-.671-1.5-1.5s.671-1.5 1.5-1.5 1.5.671 1.5 1.5-.671 1.5-1.5 1.5zm5 0c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5c.829 0 1.5.671 1.5 1.5s-.671 1.5-1.5 1.5z"
                    />
                  </svg>
                </button>
                <span class="font-bold absolute left-7 top-4 text-yellow-400">{{
                  post.comments.length
                }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["post"],
  methods: {
    like: async function (id) {
      const data = {
        id: id,
        who: this.$auth.user.data.username,
        type: "post",
      };
      await axios.post("https://piwo.tech/like", data).then((res) => {
        this.$nuxt.refresh();
      });
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