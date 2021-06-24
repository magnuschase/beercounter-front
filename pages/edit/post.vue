<template>
  <div>
    <div class="container mx-auto h-full pt-20">
      <!-- MAIN NAV -->
      <h2 class="text-4xl font-bold text-green-900 text-center mb-4">
        EDYCJA POSTA
      </h2>
      <h2 class="text-3xl font-bold text-yellow-400 text-center">
        WYBIERZ PIWO
      </h2>
      <div class="w-100 mx-4 mt-4 h-full pb-4 mb-6">
        <v-select
          class="bigSelect bg-green-900 rounded-md"
          :options="beers"
          v-model="selected"
          label="label"
        ></v-select>
      </div>
      <div
        class="
          outline
          relative
          border-green-900 border-2
          focus-within:border-green-500
          mx-4
          mb-4
        "
      >
        <input
          type="text"
          name="desc"
          v-model="desc"
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
          for="desc"
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
          >Opis</label
        >
      </div>
      <div class="mx-4">
        <NuxtLink
          :to="{
            path: '/post',
            query: { id: this.$route.query.id },
          }"
        >
          <button
            class="
              mainButton
              font-bold
              border-4 border-green-900
              hover:bg-green-900
              uppercase
            "
          >
            Anuluj
          </button>
        </NuxtLink>
        <button
          class="
            mainButton
            font-bold
            border-4 border-green-900
            hover:bg-green-900
            uppercase
          "
          @click="save"
        >
          Zapisz
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  middleware: "auth",
  data: () => {
    return {
      beers: [],
      selected: null,
      desc: "",
      post: null,
    };
  },

  async fetch() {
    this.post = await axios
      .post("https://piwo.tech/get/postdata", { id: this.$route.query.id })
      .then((res) => res.data);

    if (
      this.$auth.user.data.username == this.post.who ||
      this.$auth.user.admin
    ) {
      this.desc = this.post.desc;

      let data = {
        score: false,
        filtered: false,
      };

      this.beers = await axios
        .post("https://piwo.tech/get/beertable", data)
        .then((res) => res.data);

      this.selected = await this.beers.find(
        (element) => element.beername == this.post.beer
      );
      await this.beers.forEach((beer) => {
        beer.label = `${beer.beername} | ${beer.volume}ml`;
      });
    } else this.$router.push("/401");
  },

  methods: {
    save: async function () {
      if (this.selected != null) {
        let temporary = this.desc.replace(/\s/g, "");
        this.desc = temporary.length > 0 ? this.desc : "brak opisu";
        let data = {
          id: this.$route.query.id,
          beername: this.selected.beername,
          desc: this.desc,
        };
        await axios.post("https://piwo.tech/change/post", data).then((res) => {
          this.$swal.fire(res.data.message);
          this.$router.push("/posts");
        });
      } else this.$swal.fire("Wybierz piwo!");
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
</style>