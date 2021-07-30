<template>
  <div>
    <div class="container mx-auto h-full pt-20">
      <!-- MAIN NAV -->
      <h2 class="text-4xl font-bold text-green-900 text-center mb-4">
        EDYCJA PIWA {{ this.$route.query.beername }}
      </h2>
      <div class="w-100 mx-4 mt-4 h-full pb-4">
        <div
          class="
            outline
            relative
            border-green-900 border-2
            focus-within:border-green-500
            mx-4
            my-8
          "
        >
          <input
            type="text"
            name="beername"
            v-model="myBeer.beername"
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
            for="beername"
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
            >Nazwa piwa</label
          >
        </div>
        <div
          class="
            outline
            relative
            border-green-900 border-2
            focus-within:border-green-500
            mx-4
            my-8
          "
        >
          <input
            type="text"
            name="voltage"
            v-model="myBeer.voltage"
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
            for="voltage"
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
            >Procent alkoholu</label
          >
        </div>
        <div
          class="
            outline
            relative
            border-green-900 border-2
            focus-within:border-green-500
            mx-4
            my-8
          "
        >
          <input
            type="text"
            name="volume"
            v-model="myBeer.volume"
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
            for="volume"
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
            >Pojemność (w ml)</label
          >
        </div>
      </div>
      <div class="mx-4">
        <button
          class="
            mainButton
            font-bold
            border-4 border-green-900
            hover:bg-green-900
            uppercase
          "
          @click="save"
          :disabled="blockButton"
        >
          Zapisz
        </button>
        <NuxtLink
          :to="{
            path: '/beer',
            query: { beername: this.$route.query.beername },
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as imageConversion from "image-conversion";

export default {
  middleware: "auth",
  data: () => {
    return {
      myBeer: {
        beername: "",
        voltage: "",
        volume: "",
      },
      beer: null,
      blockButton: false,
    };
  },

  async fetch() {
    const beername = this.$route.query.beername;
    this.beer = await axios
      .post("https://piwo.tech/get/beerdata", {
        beername: beername,
      })
      .then((res) => res.data);
    this.myBeer.beername = this.beer.beer.beername;
    this.myBeer.voltage = this.beer.beer.voltage;
    this.myBeer.volume = this.beer.beer.volume;

    if (this.$auth.user.data.admin) {
      console.log("authorized");
    } else this.$router.push("/401");
  },

  methods: {
    save: async function () {
      if (
        this.myBeer.beername != "" &&
        this.myBeer.voltage != "" &&
        this.myBeer.volume != "" &&
        !isNaN(parseFloat(this.myBeer.voltage)) &&
        !isNaN(parseInt(this.myBeer.volume))
      ) {
        this.myBeer.volume = parseInt(this.myBeer.volume);
        this.myBeer.voltage = this.myBeer.voltage.replace(",", ".");
        this.myBeer.voltage =
          Math.floor(parseFloat(this.myBeer.voltage) * 100) / 100;
        this.blockButton = true;

        const data = {
          beername: this.$route.query.beername,
          name: this.myBeer.beername,
          voltage: this.myBeer.voltage,
          volume: this.myBeer.volume,
        };

        await axios
          .post("https://piwo.tech/change/beerdata", data)
          .then((res) => {
            this.$swal.fire(res.data.message);
            this.$router.push("/");
          });
      } else this.$swal.fire("Nieprawidłowe dane");
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