<template>
  <div>
    <div class="container mx-auto h-full pt-20">
      <!-- PROFILE PIC -->
      <div class="w-full h-52 my-4 flex items-center justify-center">
        <div class="h-full w-52 rounded-full bg-green-900">
          <img
            :src="postdata.imgLink"
            class="h-full w-52 rounded-full opacity-80"
          />
        </div>
      </div>
      <!-- MAIN NAV -->
      <div class="w-100 mt-4 h-7 border-b flex font-bold">
        <div class="flex w-2/12 h-full justify-start">
          <div class="h-28px justify-self-start ml-2">USER</div>
        </div>
        <div class="flex w-10/12 h-full justify-end">
          <div class="h-28px justify-self-end mr-2 cursor-pointer">
            {{ postdata.who }}
          </div>
        </div>
      </div>
      <!-- STATS -->
      <div class="w-100 mt-4 px-4 h-7 flex border-b border-green-800">
        <div class="flex w-1/12 h-full text-sm justify-start">Lokalizacja:</div>
        <div class="flex w-11/12 h-full text-sm justify-end">
          <span class="justify-self-end cursor-pointer">{{
            postdata.where
          }}</span>
        </div>
      </div>
      <div class="w-100 mt-4 px-4 flex border-b border-green-700">
        <span class="mb-2">Opis: {{ postdata.desc }}</span>
      </div>
      <!-- KOMENTARZE, LAJKI -->
      <div
        class="w-100 h-10 mt-4 flex justify-center items-center text-green-900"
      >
        <div class="relative cursor-pointer" @click="like()">
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
            <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
          <span class="font-bold absolute left-5 top-4 text-yellow-400">{{
            postdata.likes.length
          }}</span>
        </div>
        <div class="relative text-green-600 focus-within:text-green-400">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              @click="commentSend"
              :disabled="disableComment"
              class="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="w-5 h-5 text-green-600"
                viewBox="0 0 24 24"
              >
                <path d="M24 1h-24v17h8l4 5.111 4-5.111h8z" />
              </svg>
            </button>
          </span>
          <input
            type="text"
            name="comment"
            class="
              py-2
              text-sm text-white
              bg-green-900
              rounded-md
              pl-10
              focus:outline-none
              focus:bg-green-800
              focus:text-yellow-400
            "
            v-model="comment"
            :placeholder="'Skomentuj...'"
            :disabled="disableComment"
            autocomplete="off"
            @keyup.enter="commentSend"
          />
        </div>
      </div>
      <!-- KOMENTARZE -->
      <div
        v-for="comment in postdata.comments"
        :key="comment.content + comment.date.date"
      >
        <Comment :comment="comment" />
      </div>
      <!-- NAV -->
      <NuxtLink to="/others">
        <button
          class="
            mainButton
            font-bold
            border-4 border-green-900
            hover:bg-green-900
          "
        >
          INNE POSTY
        </button>
      </NuxtLink>
      <NuxtLink to="/">
        <button
          class="
            mainButton
            font-bold
            border-4 border-green-900
            hover:bg-green-900
          "
        >
          STRONA GŁÓWNA
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  middleware: "auth",
  data: () => {
    return {
      comment: "",
      disableComment: false,
    };
  },
  async asyncData({ query }) {
    const postdata = await axios
      .post("https://piwo.tech/get/otherdata", { id: query.id })
      .then((res) => res.data);
    return { postdata };
  },
  methods: {
    commentSend: async function () {
      let temporary = this.comment.replace(/\s/g, "");
      if (temporary.length > 0) {
        this.disableComment = true;
        const data = {
          id: this.$route.query.id,
          type: "other",
          who: this.$auth.user.data.username,
          date: new Date().getTime(),
          content: this.comment,
        };
        await axios.post("https://piwo.tech/comment", data).then((res) => {
          this.$nuxt.refresh();
          this.comment = "";
          this.disableComment = false;
        });
      }
    },
    like: async function () {
      const data = {
        id: this.postdata._id,
        who: this.$auth.user.data.username,
        type: "other",
      };
      await axios.post("https://piwo.tech/like", data).then((res) => {
        this.$nuxt.refresh();
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
.h-28px {
  height: 28px;
}
.fade-enter-active,
.fade-leave-active {
  /* transition: all 0.25s ease-in-out; */
  transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
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
.mw-60 {
  max-width: 60%;
}
.text-xs {
  font-size: 0.6rem;
}
.h-28px {
  height: 28px;
}
</style>