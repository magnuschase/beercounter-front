<template>
  <div>
    <div class="container mx-auto h-full pt-20">
      <!-- HEADER -->
      <h2 class="text-3xl font-bold text-yellow-400 text-center uppercase">
        {{ headerText }}
      </h2>
      <div class="w-full flex justify-center my-4">
        <button
          class="
            h-10
            px-5
            text-green-700
            transition-colors
            duration-150
            border border-green-500
            rounded-lg
            focus:shadow-outline
            hover:bg-green-500
            hover:text-green-100
          "
          @click="changeSorting"
        >
          {{ sortingText }}
        </button>
      </div>
      <div class="w-full flex flex-row flex-wrap justify-center">
        <div
          class="flex justify-center"
          v-for="post in filteredPosts"
          :key="post._id"
        >
          <Post :post="post" />
        </div>
      </div>
      <!-- SORT MORE -->
      <div class="mx-4">
        <button
          class="
            mainButton
            font-bold
            border-4 border-green-900
            hover:bg-green-900
            uppercase
          "
          @click="sortMore"
        >
          Pokaż więcej
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Post from "../components/Post.vue";
export default {
  middleware: "auth",
  components: { Post },
  data: () => {
    return {
      posts: [],
      filteredPosts: [],
      newest: true,
      sortingText: "sortuj od najstarszych",
      headerText: "najnowsze posty",
      filter: 5,
    };
  },
  async fetch() {
    this.posts = await axios
      .post("https://piwo.tech/get/posts")
      .then((res) => res.data);
    await this.posts.sort((a, b) => (a.date.date < b.date.date ? 1 : -1));
    this.filteredPosts = this.posts.filter(
      (element, index) => index < this.filter
    );
    console.log(this.posts);
    console.log(this.filteredPosts);
  },
  methods: {
    sortMore: function () {
      this.filter += 5;
      this.filteredPosts = this.posts.filter(
        (element, index) => index < this.filter
      );
    },
    changeSorting: function () {
      this.filter = 5;
      this.newest = !this.newest;
      if (this.newest) {
        this.sortingText = "sortuj od najstarszych";
        this.headerText = "najnowsze posty";
        this.posts.sort((a, b) => (a.date.date < b.date.date ? 1 : -1));
      } else {
        this.sortingText = "sortuj od najnowszych";
        this.headerText = "najstarsze posty";
        this.posts.sort((a, b) => (a.date.date > b.date.date ? 1 : -1));
      }
      this.filteredPosts = this.posts.filter(
        (element, index) => index < this.filter
      );
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