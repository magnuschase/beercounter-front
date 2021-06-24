<template>
  <div>
    <div class="container mx-auto h-full pt-20">
      <!-- MAIN NAV -->
      <div class="w-100 mt-4 h-7 border-b flex font-bold">
        <div class="flex w-2/12 h-full justify-start">
          <div class="h-28px justify-self-start ml-2">BEER</div>
        </div>
        <div class="flex w-10/12 h-full justify-end">
          <div class="h-28px justify-self-end mr-2 cursor-pointer">
            {{ this.$route.query.beername }}
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
              Math.floor(beerdata.beer.points)
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
            <span class="text-yellow-400 font-bold text-sm"
              >{{ beerdata.beer.voltage }}%</span
            >
          </div>
          <div class="absolute top-0 left-3 font-bold mw-60 text-sm">
            PROCENT ALKOHOLU
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
              >{{ beerdata.beer.volume }}<span class="text-xs">ml</span></span
            >
          </div>
          <div class="absolute top-0 left-3 font-bold mw-60 text-sm">
            POJEMNOŚĆ
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
              >{{ beerdata.score }}<span class="text-xs">/5</span></span
            >
          </div>
          <div class="absolute top-0 left-3 font-bold mw-60 text-sm">
            ŚREDNIA OCENA
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
            <span class="text-yellow-400 font-bold text-sm">{{ rankNum }}</span>
          </div>
          <div class="absolute top-0 left-3 font-bold mw-60 text-sm">
            RANKING NR
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
              >{{
                Math.floor(
                  beerdata.beer.voltage *
                    0.01 *
                    beerdata.beer.volume *
                    beerdata.drank
                )
              }}ml</span
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
              bg-green-700
              opacity-70
              flex
              items-center
              justify-center
              rounded-b-3xl
            "
          >
            <span class="text-yellow-400 font-bold text-sm">{{
              beerdata.drank
            }}</span>
          </div>
          <div class="absolute top-0 left-3 font-bold mw-60 text-sm">
            WYPITE PIWA
          </div>
        </div>
      </div>
      <!-- USERTABLE -->
      <div>
        <div
          class="
            grid grid-cols-7
            bg-green-900
            border-b border-gray-900
            font-bold
          "
        >
          <div class="text-center">NR</div>
          <div class="col-span-4 text-center">USER</div>
          <div class="col-span-2 text-center">WYPITE</div>
        </div>
        <div
          v-for="(user, i) in beerdata.users"
          :key="user.username"
          class="
            grid grid-cols-7
            bg-green-700
            border-b border-green-800
            text-sm
            font-bold
          "
        >
          <div class="text-center">{{ i + 1 }}</div>
          <div class="col-span-4 text-center truncate">{{ user.name }}</div>
          <div class="col-span-2 text-center truncate">{{ user.drank }}</div>
        </div>
      </div>
      <!-- POSTS -->
      <div class="w-full flex flex-row flex-wrap justify-center">
        <div
          class="flex justify-center"
          v-for="post in beerdata.posts"
          :key="post._id"
        >
          <Post :post="post" />
        </div>
      </div>
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
      currentTab: "Post",
    };
  },
  async asyncData({ query }) {
    const beerdata = await axios
      .post("https://piwo.tech/get/beerdata", {
        beername: query.beername,
      })
      .then((res) => res.data);
    beerdata.posts.sort((a, b) => (a.date.date < b.date.date ? 1 : -1));

    beerdata.users = await beerdata.users.filter(
      (element) => element.drank > 0
    );

    const beerTable = await axios
      .post("https://piwo.tech/get/beertable", { filter: false })
      .then((res) => res.data);
    const rankNum =
      (await beerTable.findIndex(
        (element) => element.beername == query.beername
      )) + 1;

    return { beerdata, rankNum };
  },
  methods: {
    volumeDrank: function (array) {
      let volume = 0;
      array.forEach((post) => {
        volume += post.volume;
      });
      return Math.floor(volume / 100) / 10;
    },
    // rankNum: function (array) {
    //   const index = array.findIndex(
    //     (element) => element.username == this.$route.query.username
    //   );
    //   return index + 1;
    // },
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