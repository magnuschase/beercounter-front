<template>
  <div>
    <div class="container mx-auto h-full pt-20">
      <!-- MAIN NAV -->
      <div class="w-100 mt-4 h-7 border-b flex font-bold">
        <div class="flex w-2/12 h-full justify-start">
          <div class="h-28px justify-self-start ml-2">TOP</div>
        </div>
        <div class="flex w-10/12 h-full justify-end">
          <div class="h-28px justify-self-end mr-2 cursor-pointer">BEERS</div>
        </div>
      </div>
      <!-- BEERTABLE NAV -->
      <div
        v-if="currentTab == 'BeerTable'"
        class="w-100 mt-4 h-7 border-b flex font-medium text-xs"
      >
        <div class="flex w-3/12 h-full justify-start">
          <div class="h-28px justify-self-start ml-2">SORT BY</div>
        </div>
        <div class="flex w-9/12 h-full justify-end">
          <div
            class="h-28px justify-self-end mr-2 cursor-pointer"
            :class="{
              'border-b': sortBy == 'Drank',
              'border-green-600': sortBy == 'Drank',
            }"
            @click="changeSorting('Drank')"
          >
            DRANK
          </div>
          <div
            class="h-28px justify-self-end mr-2 cursor-pointer"
            :class="{
              'border-b': sortBy == 'Score',
              'border-green-600': sortBy == 'Score',
            }"
            @click="changeSorting('Score')"
          >
            SCORE
          </div>
        </div>
      </div>
      <!-- COMPONENT BOX -->
      <div class="w-100 mt-4 h-full">
        <transition name="fade" mode="out-in">
          <component :is="currentTab" :prop="rankTable" :sort="sortBy" />
        </transition>
      </div>
      <NuxtLink to="/report">
        <button
          class="
            mainButton
            font-bold
            border-4 border-green-900
            hover:bg-green-900
          "
        >
          ZGŁOŚ WYPITE PIWO
        </button>
      </NuxtLink>
      <NuxtLink to="/users">
        <button
          class="
            mainButton
            font-bold
            border-4 border-green-900
            hover:bg-green-900
          "
        >
          WSZYSCY UŻYTKOWNICY
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
import BeerTable from "../components/BeerTable";

export default {
  middleware: "auth",
  components: { BeerTable },
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
      .post("https://piwo.tech/get/beertable", { filter: false })
      .then((res) => res.data);
    this.currentTab = "BeerTable";
  },
  methods: {
    changeSorting: async function (name) {
      switch (name) {
        case "Drank":
          this.beerParams = {
            filter: false,
            score: false,
          };
          this.rankTable = await axios
            .post("https://piwo.tech/get/beertable", this.beerParams)
            .then((res) => res.data);
          break;
        case "Score":
          this.beerParams = {
            filter: false,
            score: true,
          };
          this.rankTable = await axios
            .post("https://piwo.tech/get/beertable", this.beerParams)
            .then((res) => res.data);
          console.log(this.rankTable);
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