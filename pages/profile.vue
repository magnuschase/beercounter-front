<template>
  <div>
    <div class="container mx-auto h-full pt-20">
      <!-- PROFILE PIC -->
      <div class="w-full h-52 my-4 flex items-center justify-center">
        <div class="h-full w-52 rounded-full bg-green-900">
          <img
            :src="userdata.data.profilePic || 'xd'"
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
            {{ this.$route.query.username }}
          </div>
        </div>
      </div>
      <!-- DATA TABLE -->
      <div class="w-full grid grid-cols-3 lg:grid-cols-9 my-8">
        <div class="h-24 w-full relative">
          <div
            class="
              absolute
              top-6
              left-5
              h-20
              w-20
              bg-green-900
              opacity-80
              flex
              items-center
              justify-center
              rounded-b-3xl
            "
          >
            <span class="text-yellow-400 font-bold text-sm">{{
              Math.floor(userdata.data.points)
            }}</span>
          </div>
          <div class="absolute top-0 left-3 font-bold mw-60 text-sm">
            ILOŚĆ PUNKTOW
          </div>
        </div>
        <div class="h-24 w-full relative">
          <div
            class="
              absolute
              top-6
              left-5
              h-20
              w-20
              bg-green-900
              opacity-80
              flex
              items-center
              justify-center
              rounded-b-3xl
            "
          >
            <span class="text-yellow-400 font-bold text-sm">{{
              userdata.posts.length
            }}</span>
          </div>
          <div class="absolute top-0 left-3 font-bold mw-60 text-sm">
            WYPITE PIWA
          </div>
        </div>
        <div class="h-24 w-full relative">
          <div
            class="
              absolute
              top-6
              left-5
              h-20
              w-20
              bg-green-900
              opacity-80
              flex
              items-center
              justify-center
              rounded-b-3xl
            "
          >
            <span class="text-yellow-400 font-bold text-sm"
              >{{ Math.floor(userdata.data.alcohol)
              }}<span class="text-xs">ml</span></span
            >
          </div>
          <div class="absolute top-0 left-3 font-bold mw-60 text-sm">
            WYPITY ALKOHOL
          </div>
        </div>
        <div class="mt-4 lg:mt-0 h-24 w-full relative">
          <div
            class="
              absolute
              top-6
              left-5
              h-20
              w-20
              bg-green-800
              opacity-80
              flex
              items-center
              justify-center
              rounded-b-3xl
            "
          >
            <span class="text-yellow-400 font-bold text-sm"
              >{{ volumeDrank(userdata.posts)
              }}<span class="text-xs">l</span></span
            >
          </div>
          <div class="absolute top-0 left-3 font-bold mw-60 text-sm">
            WYPITE PIWO
          </div>
        </div>
        <div class="mt-4 lg:mt-0 h-24 w-full relative">
          <div
            class="
              absolute
              top-6
              left-5
              h-20
              w-20
              bg-green-800
              opacity-80
              flex
              items-center
              justify-center
              rounded-b-3xl
            "
          >
            <span class="text-yellow-400 font-bold text-sm">{{
              userdata.pukes.length
            }}</span>
          </div>
          <div class="absolute top-0 left-3 font-bold mw-60 text-sm">
            ILOŚĆ ZWROTÓW
          </div>
        </div>
        <div class="mt-4 lg:mt-0 h-24 w-full relative">
          <div
            class="
              absolute
              top-6
              left-5
              h-20
              w-20
              bg-green-800
              opacity-80
              flex
              items-center
              justify-center
              rounded-b-3xl
            "
          >
            <span class="text-yellow-400 font-bold text-sm">{{
              userdata.other.length
            }}</span>
          </div>
          <div class="absolute top-0 left-3 font-bold mw-60 text-sm">
            ILOŚĆ INNYCH
          </div>
        </div>
        <div class="mt-4 lg:mt-0 h-24 w-full relative">
          <div
            class="
              absolute
              top-6
              left-5
              h-20
              w-20
              bg-green-700
              opacity-70
              flex
              items-center
              justify-center
              rounded-b-3xl
            "
          >
            <span class="text-yellow-400 font-bold text-sm">{{
              likes(userdata)
            }}</span>
          </div>
          <div class="absolute top-0 left-3 font-bold mw-60 text-sm">
            ILOŚĆ LAJKÓW
          </div>
        </div>
        <div class="mt-4 lg:mt-0 h-24 w-full relative">
          <div
            class="
              absolute
              top-6
              left-5
              h-20
              w-20
              bg-green-700
              opacity-70
              flex
              items-center
              justify-center
              rounded-b-3xl
            "
          >
            <span class="text-yellow-400 font-bold text-sm">{{
              comments(userdata)
            }}</span>
          </div>
          <div class="absolute top-0 left-3 font-bold mw-60 text-sm">
            ILOŚĆ KOMENTARZY
          </div>
        </div>
        <div class="mt-4 lg:mt-0 h-24 w-full relative">
          <div
            class="
              absolute
              top-6
              left-5
              h-20
              w-20
              bg-green-700
              opacity-70
              flex
              items-center
              justify-center
              rounded-b-3xl
            "
          >
            <span class="text-yellow-400 font-bold text-sm">{{
              rankNum(usertable)
            }}</span>
          </div>
          <div class="absolute top-0 left-3 font-bold mw-60 text-sm">
            RANKING NR
          </div>
        </div>
      </div>
      <!-- EDIT PROFILE -->
      <div
        v-if="
          userdata.data.username == this.$auth.user.data.username ||
          this.$auth.user.data.admin
        "
        class="w-full flex justify-center"
      >
        <NuxtLink
          :to="{
            path: '/edit/user',
            query: { username: userdata.data.username },
          }"
        >
          <button
            class="
              inline-flex
              items-center
              h-10
              px-5
              text-green-100
              transition-colors
              duration-150
              bg-green-700
              rounded-lg
              focus:shadow-outline
              hover:bg-green-800
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 mr-3 fill-current"
              viewBox="0 0 24 24"
            >
              <path
                d="M14.078 4.232l-12.64 12.639-1.438 7.129 7.127-1.438 12.641-12.64-5.69-5.69zm-10.369 14.893l-.85-.85 11.141-11.125.849.849-11.14 11.126zm2.008 2.008l-.85-.85 11.141-11.125.85.85-11.141 11.125zm18.283-15.444l-2.816 2.818-5.691-5.691 2.816-2.816 5.691 5.689z"
              />
            </svg>
            <span>Edytuj profil</span>
          </button>
        </NuxtLink>
      </div>
      <!-- USERTABLE -->
      <div class="my-4">
        <div
          class="
            grid grid-cols-7
            bg-green-900
            border-b border-gray-900
            font-bold
          "
        >
          <div class="text-center">NR</div>
          <div class="col-span-4 text-center">PIWO</div>
          <div class="col-span-2 text-center">WYPITE</div>
        </div>
        <div
          v-for="(beer, i) in beertable"
          :key="beer.beername"
          class="
            grid grid-cols-7
            bg-green-700
            border-b border-green-800
            text-sm
            font-bold
          "
        >
          <div class="text-center">{{ i + 1 }}</div>
          <div class="col-span-4 text-center truncate">{{ beer.beername }}</div>
          <div class="col-span-2 text-center truncate">{{ beer.drank }}</div>
        </div>
      </div>
      <!-- POSTS NAV -->
      <div class="w-100 mt-4 h-7 border-b flex font-bold">
        <div class="flex w-2/12 h-full justify-start">
          <div class="h-28px justify-self-start ml-2">POSTS</div>
        </div>
        <div class="flex w-10/12 h-full justify-end">
          <div
            class="h-28px justify-self-end mr-2 cursor-pointer"
            :class="{
              'border-b': currentTab == 'Post',
              'border-green-600': currentTab == 'Post',
            }"
            @click="changeTab('Post')"
          >
            BEER
          </div>
          <div
            class="h-28px justify-self-end mr-2 cursor-pointer"
            :class="{
              'border-b': currentTab == 'Puke',
              'border-green-600': currentTab == 'Puke',
            }"
            @click="changeTab('Puke')"
          >
            PUKES
          </div>
          <div
            class="h-28px justify-self-end mr-2 cursor-pointer"
            :class="{
              'border-b': currentTab == 'Other',
              'border-green-600': currentTab == 'Other',
            }"
            @click="changeTab('Other')"
          >
            OTHER
          </div>
        </div>
      </div>
      <!-- POSTS -->
      <div class="w-full flex flex-row flex-wrap justify-center">
        <div v-if="currentTab == 'Post'">
          <div
            class="flex justify-center"
            v-for="post in userdata.posts"
            :key="post._id"
          >
            <Post :post="post" />
          </div>
        </div>
        <div v-if="currentTab == 'Puke'">
          <div
            class="flex justify-center"
            v-for="puke in userdata.pukes"
            :key="puke._id"
          >
            <Puke :post="puke" :mode="'puke'" />
          </div>
        </div>
        <div v-if="currentTab == 'Other'">
          <div
            class="flex justify-center"
            v-for="other in userdata.other"
            :key="other._id"
          >
            <Puke :post="other" :mode="'other'" />
          </div>
        </div>
      </div>
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
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  middleware: "auth",
  data: () => {
    return {
      currentTab: "Post",
    };
  },
  async asyncData({ query }) {
    const userdata = await axios
      .post("https://piwo.tech/get/userdata", {
        who: query.username,
      })
      .then((res) => res.data);
    userdata.posts.sort((a, b) => (a.date.date < b.date.date ? 1 : -1));
    userdata.pukes.sort((a, b) => (a.date.date < b.date.date ? 1 : -1));
    userdata.other.sort((a, b) => (a.date.date < b.date.date ? 1 : -1));
    const usertable = await axios
      .post("https://piwo.tech/get/usertable/posts", { filter: false })
      .then((res) => res.data);

    const beertable = [];
    await userdata.posts.forEach((post) => {
      const index = beertable.findIndex(
        (element) => element.beername == post.beer
      );
      if (index < 0) {
        beertable.push({ beername: post.beer, drank: 1 });
      } else {
        beertable[index].drank += 1;
      }
    });
    beertable.sort((a, b) => (a.drank < b.drank ? 1 : -1));

    return { userdata, usertable, beertable };
  },
  methods: {
    volumeDrank: function (array) {
      let volume = 0;
      array.forEach((post) => {
        volume += post.volume;
      });
      return Math.floor(volume / 100) / 10;
    },
    likes: function (object) {
      let likes = 0;
      object.posts.forEach((post) => {
        likes += post.likes.length;
      });
      object.pukes.forEach((post) => {
        likes += post.likes.length;
      });
      object.other.forEach((post) => {
        likes += post.likes.length;
      });
      return likes;
    },
    comments: function (object) {
      let comments = 0;
      object.posts.forEach((post) => {
        comments += post.comments.length;
      });
      object.pukes.forEach((post) => {
        comments += post.comments.length;
      });
      object.other.forEach((post) => {
        comments += post.comments.length;
      });
      return comments;
    },
    rankNum: function (array) {
      const index = array.findIndex(
        (element) => element.username == this.$route.query.username
      );
      return index + 1;
    },
    changeTab: async function (name) {
      this.currentTab = name;
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