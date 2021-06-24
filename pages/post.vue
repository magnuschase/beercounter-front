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
      <div class="w-100 mt-4 px-4 h-7 flex border-b border-green-900">
        <div class="flex w-1/12 h-full text-xl justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="w-6 h-4 text-green-600"
            viewBox="0 0 24 24"
          >
            <path
              d="M17 21.224v-12.772c1.106-.594 1.674-1.762 1.674-3.104 0-1.874-1.473-3.411-3.32-3.515-.768-1.068-2.221-1.833-3.739-1.833-.971 0-1.78.322-2.582.964-1.292-.422-2.747-.143-3.795.792-2.155-.342-4.238 1.244-4.238 3.501 0 1.396.819 2.581 2 3.15v12.817c0 .664-.336 1.203-1 1.203v1.573h16v-1.573c-.664 0-1-.539-1-1.203zm-9-.224h-2v-12.719c.672.422 1.516.406 2 .267v12.452zm7.154-13.707c-.627 0-1.184-.296-1.539-.756l-.451.316c-1.522 1.178-.113 3.303-.01 4.324.102.977-.505 1.712-1.458 1.712-.93 0-1.475-.786-1.401-1.712.078-.978 1.562-2.918-.083-4.438l-.623-.568c-.425.497-1.056.813-1.761.813-.605 0-1.155-.231-1.568-.611-.354.487-.927.804-1.575.804-2.716 0-2.817-3.889 0-3.889.398 0 .77.12 1.077.326.384-.751 1.163-1.266 2.065-1.266.591 0 1.131.222 1.54.586.494-.814 1.39-1.359 2.412-1.359 1.255 0 2.32.82 2.685 1.955.213-.082.445-.126.689-.126 1.072 0 1.943.871 1.943 1.944s-.869 1.945-1.942 1.945zm7.846 5.159c0 2.539-1.791 5.75-5 6.963v-2.16c3.154-1.83 3.969-6.255 1.553-6.255h-1.553v-2h1.912c2.144 0 3.088 1.534 3.088 3.452z"
            />
          </svg>
        </div>
        <div class="flex w-11/12 h-full text-sm justify-end">
          <span class="justify-self-end cursor-pointer">{{
            postdata.beer
          }}</span>
        </div>
      </div>
      <div class="w-100 mt-4 px-4 h-7 flex border-b border-green-800">
        <div class="flex w-1/12 h-full text-xl justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="w-6 h-4 text-green-500"
            viewBox="0 0 24 24"
          >
            <path
              d="M21.143 9.667c-.733-1.392-1.914-3.05-3.617-4.753-2.977-2.978-5.478-3.914-6.785-3.914-.414 0-.708.094-.86.246l-1.361 1.36c-1.899-.236-3.42.106-4.294.983-.876.875-1.164 2.159-.792 3.523.492 1.806 2.305 4.049 5.905 5.375.038.323.157.638.405.885.588.588 1.535.586 2.121 0s.588-1.533.002-2.119c-.588-.587-1.537-.588-2.123-.001l-.17.256c-2.031-.765-3.395-1.828-4.232-2.9l3.879-3.875c.496 2.73 6.432 8.676 9.178 9.178l-7.115 7.107c-.234.153-2.798-.316-6.156-3.675-3.393-3.393-3.175-5.271-3.027-5.498l1.859-1.856c-.439-.359-.925-1.103-1.141-1.689l-2.134 2.131c-.445.446-.685 1.064-.685 1.82 0 1.634 1.121 3.915 3.713 6.506 2.764 2.764 5.58 4.243 7.432 4.243.648 0 1.18-.195 1.547-.562l8.086-8.078c.91.874-.778 3.538-.778 4.648 0 1.104.896 1.999 2 1.999 1.105 0 2-.896 2-2 0-3.184-1.425-6.81-2.857-9.34zm-16.209-5.371c.527-.53 1.471-.791 2.656-.761l-3.209 3.206c-.236-.978-.049-1.845.553-2.445zm9.292 4.079l-.03-.029c-1.292-1.292-3.803-4.356-3.096-5.063.715-.715 3.488 1.521 5.062 3.096.862.862 2.088 2.247 2.937 3.458-1.717-1.074-3.491-1.469-4.873-1.462z"
            />
          </svg>
        </div>
        <div class="flex w-11/12 h-full text-sm justify-end">
          <span class="justify-self-end cursor-pointer"
            >{{ postdata.volume }}ml</span
          >
        </div>
      </div>
      <div class="w-100 mt-4 px-4 h-7 flex border-b border-green-700">
        <div class="flex w-1/12 h-full text-xl justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="w-6 h-4 text-green-400"
            viewBox="0 0 24 24"
          >
            <path d="M8 24l3-9h-9l14-15-3 9h9l-14 15z" />
          </svg>
        </div>
        <div class="flex w-11/12 h-full text-sm justify-end">
          <span class="justify-self-end cursor-pointer"
            >{{ postdata.voltage }}%</span
          >
        </div>
      </div>
      <div class="w-100 mt-4 px-4 h-7 flex border-b border-green-700">
        <div class="flex w-1/12 h-full text-xl justify-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="w-6 h-4 text-green-400"
            viewBox="0 0 24 24"
          >
            <path d="M8 24l3-9h-9l14-15-3 9h9l-14 15z" />
          </svg>
        </div>
        <div class="flex w-11/12 h-full text-sm justify-end">
          <span class="justify-self-end cursor-pointer"
            >{{ postdata.voltage }}%</span
          >
        </div>
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
        <NuxtLink
          v-if="
            this.$auth.user.data.username == postdata.who ||
            this.$auth.user.admin
          "
          :to="{ path: '/edit/post', query: { id: postdata._id } }"
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
          v-if="
            this.$auth.user.data.username == postdata.who ||
            this.$auth.user.admin
          "
          @click="remove"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
          >
            <path
              d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
            />
          </svg>
        </button>
      </div>
      <div
        class="w-100 h-10 my-4 flex justify-center items-center text-green-900"
      >
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
      <NuxtLink to="/posts">
        <button
          class="
            mainButton
            font-bold
            border-4 border-green-900
            hover:bg-green-900
          "
        >
          WSZYSTKIE POSTY
        </button>
      </NuxtLink>
      <NuxtLink to="/beers">
        <button
          class="
            mainButton
            font-bold
            border-4 border-green-900
            hover:bg-green-900
          "
        >
          WSZYSTKIE PIWA
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
      .post("https://piwo.tech/get/postdata", { id: query.id })
      .then((res) => res.data);
    return { postdata };
  },
  methods: {
    volumeDrank: function (array) {
      let volume = 0;
      array.forEach((post) => {
        volume += post.volume;
      });
      return Math.floor(volume / 100) / 10;
    },
    commentSend: async function () {
      let temporary = this.comment.replace(/\s/g, "");
      if (temporary.length > 0) {
        this.disableComment = true;
        const data = {
          id: this.$route.query.id,
          type: "post",
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
    rankNum: function (array) {
      const index = array.findIndex(
        (element) => element.username == this.$route.query.username
      );
      return index + 1;
    },
    like: async function () {
      const data = {
        id: this.postdata._id,
        who: this.$auth.user.data.username,
        type: "post",
      };
      await axios.post("https://piwo.tech/like", data).then((res) => {
        this.$nuxt.refresh();
      });
    },
    remove: async function () {
      this.$swal
        .fire({
          title: "Czy na pewno chcesz usunąć post?",
          showCancelButton: true,
          confirmButtonText: `Usuń`,
          cancelButtonText: `Nie usuwaj`,
        })
        .then(async (result) => {
          if (result.value) {
            this.$swal.fire("Post jest usuwany...");
            await axios
              .post("https://piwo.tech/remove/post", {
                id: this.postdata._id,
              })
              .then((res) => {
                this.$swal.fire("Post został usunięty");
                this.$router.push("/posts");
              });
          }
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