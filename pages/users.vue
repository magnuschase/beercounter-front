<template>
  <div>
    <div class="container mx-auto h-full pt-20">
      <!-- MAIN NAV -->
      <div class="w-100 mt-4 h-7 border-b flex font-bold">
        <div class="flex w-2/12 h-full justify-start">
          <div class="h-28px justify-self-start ml-2">TOP</div>
        </div>
        <div class="flex w-10/12 h-full justify-end">
          <div class="h-28px justify-self-end mr-2 cursor-pointer">USERS</div>
        </div>
      </div>
      <!-- USERTABLE NAV -->
      <div
        v-if="currentTab == 'UserTable'"
        class="w-100 mt-4 h-7 border-b flex font-medium text-xs"
      >
        <div class="flex w-3/12 h-full justify-start">
          <div class="h-28px justify-self-start ml-2">SORT BY</div>
        </div>
        <div class="flex w-9/12 h-full justify-end">
          <div
            class="h-28px justify-self-end mr-2 cursor-pointer"
            :class="{
              'border-b': sortBy == 'Points',
              'border-green-600': sortBy == 'Points',
            }"
            @click="changeSorting('Points')"
          >
            POINTS
          </div>
          <div
            class="h-28px justify-self-end mr-2 cursor-pointer"
            :class="{
              'border-b': sortBy == 'Pukes',
              'border-green-600': sortBy == 'Pukes',
            }"
            @click="changeSorting('Pukes')"
          >
            PUKES
          </div>
          <div
            class="h-28px justify-self-end mr-2 cursor-pointer"
            :class="{
              'border-b': sortBy == 'Other',
              'border-green-600': sortBy == 'Other',
            }"
            @click="changeSorting('Other')"
          >
            OTHER
          </div>
        </div>
      </div>
      <!-- COMPONENT BOX -->
      <div class="w-100 mt-4 h-full">
        <transition name="fade" mode="out-in">
          <component :is="currentTab" :prop="rankTable" :sort="sortBy" />
        </transition>
      </div>
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
      <NuxtLink to="/beers">
        <button
          class="
            mainButton
            font-bold
            border-4 border-green-900
            hover:bg-green-900
          "
        >
          RANKING PIW
        </button>
      </NuxtLink>
      <NuxtLink to="/posts">
        <button
          class="
            mainButton
            font-bold
            border-4 border-green-900
            hover:bg-green-900
          "
        >
          POSTY
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserTable from "../components/UserTable";
export default {
  middleware: "auth",
  components: { UserTable },
  data: () => {
    return {
      rankTable: [],
      currentTab: "",
      sortBy: "Points",
      beerParams: {
        filter: true,
        score: false,
      },
    };
  },
  async fetch() {
    this.rankTable = await axios
      .post("https://piwo.tech/get/usertable/posts", { filter: false })
      .then((res) => res.data);
    this.currentTab = "UserTable";
  },
  methods: {
    changeSorting: async function (name) {
      switch (name) {
        case "Points":
          this.rankTable = await axios
            .post("https://piwo.tech/get/usertable/posts", {
              filter: false,
            })
            .then((res) => res.data);
          break;
        case "Pukes":
          this.rankTable = await axios
            .post("https://piwo.tech/get/usertable/pukes", { filter: false })
            .then((res) => res.data);
          break;
        case "Other":
          this.rankTable = await axios
            .post("https://piwo.tech/get/usertable/others", {
              filter: false,
            })
            .then((res) => res.data);
          break;
      }
      this.sortBy = name;
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
</style>