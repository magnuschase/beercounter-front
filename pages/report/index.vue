<template>
  <div>
    <div class="container mx-auto h-full pt-20">
      <div v-if="blockButton">
        <h2 class="text-3xl font-bold text-yellow-400 my-4 text-center">
          {{ infoText }}
        </h2>
      </div>
      <!-- MAIN NAV -->
      <h2 class="text-3xl font-bold text-yellow-400 text-center">
        DODAJ ZDJĘCIE
      </h2>
      <div class="mx-4 py-4">
        <div class="flex justify-center w-full h-20 cursor-pointer relative">
          <input
            type="file"
            @change="imageChange($event.target.files[0])"
            accept="image/*"
            capture="camera"
            class="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
          />
          <label
            class="
              flex
              justify-center
              items-center
              w-full
              h-full
              text-white
              font-semibold
              bg-green-900
              rounded-md
              cursor-pointer
            "
          >
            {{ uploadText }}
            <div
              v-if="file != undefined"
              class="
                ml-4
                w-10
                h-10
                rounded-full
                opacity-70
                bg-cover bg-no-repeat bg-center
                flex
                justify-center
              "
              :style="{ backgroundImage: `url(${previewImg})` }"
            ></div>
          </label>
        </div>
      </div>
      <h2 class="text-3xl font-bold text-yellow-400 text-center">
        WYBIERZ PIWO
      </h2>
      <!-- COMPONENT BOX -->
      <div v-if="oldBeer" class="w-100 mx-4 mt-4 h-full pb-4">
        <v-select
          class="bigSelect bg-green-900 rounded-md"
          :options="beers"
          v-model="selected"
          label="label"
        ></v-select>
      </div>
      <div v-else class="w-100 mx-4 mt-4 h-full pb-4">
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
      <h2 class="text-3xl font-bold text-yellow-400 text-center">OCEŃ PIWO</h2>
      <div class="w-100 h-10 mb-10 flex items-center justify-center">
        <star-rating
          :rating="score"
          :star-size="25"
          :animate="true"
          :show-rating="false"
          @rating-selected="setScore"
        ></star-rating>
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
        <button
          class="
            mainButton
            font-bold
            border-4 border-green-900
            hover:bg-green-900
            uppercase
          "
          @click="switchBeer"
        >
          {{ switchButtonText }}
        </button>
        <button
          class="
            mainButton
            font-bold
            border-4 border-green-900
            hover:bg-green-900
          "
          :disabled="blockButton"
          @click="addPost"
        >
          DODAJ POST
        </button>
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
      beers: [],
      selected: null,
      oldBeer: true,
      switchButtonText: "Mojego piwa nie ma na liście",
      file: undefined,
      uploadText: "Dodaj zdjęcie",
      score: 0,
      desc: "",
      myBeer: {
        beername: "",
        voltage: "",
        volume: "",
      },
      blockButton: false,
      infoText: "trwa przesyłanie pliku",
      previewImg: null,
    };
  },
  async fetch() {
    let data = {
      score: false,
      filtered: false,
    };
    this.beers = await axios
      .post("https://piwo.tech/get/beertable", data)
      .then((res) => res.data);
    await this.beers.forEach((beer) => {
      beer.label = `${beer.beername} | ${beer.volume}ml`;
    });
  },
  methods: {
    setScore: function (rating) {
      this.score = rating;
    },
    imageChange: async function (image) {
      if (image != undefined) {
        this.file = image;
        this.uploadText = "Zdjęcie zostało dodane";
        console.log(this.file);
        const res = await imageConversion.compress(this.file, 0.8);
        this.file = res;

        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImg = e.target.result;
        };
        reader.readAsDataURL(image);
      }
    },
    switchBeer: function () {
      this.oldBeer = !this.oldBeer;
      if (this.oldBeer) {
        this.switchButtonText = "Mojego piwa nie ma na liście";
      } else this.switchButtonText = "Wybierz piwo z listy";
    },
    addPost: async function () {
      if (this.file != undefined) {
        let fd = new FormData();
        fd.append("file", this.file);

        if (this.desc.length > 80) {
          this.desc = this.desc.slice(0, 77);
          this.desc += "...";
        }
        if (this.oldBeer && this.score != 0) {
          if (this.selected != null) {
            this.blockButton = true;
            axios
              .post("https://piwo.tech/upload/file", fd)
              .then(async (res) => {
                this.infoText = "plik został przesłany, dodawanie posta";
                let postData = {
                  who: this.$auth.user.data.username,
                  beer: this.selected.beername,
                  link: res.data.link,
                  date: new Date().getTime(),
                  desc: this.desc != "" ? this.desc : "brak opisu",
                  score: this.score,
                };

                await axios
                  .post("https://piwo.tech/add/post", postData)
                  .then((response) => {
                    this.infoText = "dodano post!";
                    this.$swal.fire("Dodano nowy post!");
                    this.$router.push("/posts");
                  });
              })
              .catch((err) => {
                this.$swal.fire(
                  `Wystąpił błąd! Wyślij skrina adminowi i spróbuj ponownie. ${err}`
                );
              });
          } else this.$swal.fire("Wybierz piwo!");
        } else if (!this.oldBeer && this.score != 0) {
          if (
            this.myBeer.beername != "" &&
            this.myBeer.voltage != "" &&
            this.myBeer.volume != "" &&
            !isNaN(parseFloat(this.myBeer.voltage)) &&
            !isNaN(parseInt(this.myBeer.volume)) &&
            parseInt(this.myBeer.volume) < 5001 &&
            parseFloat(this.myBeer.voltage) < 40
          ) {
            let duplicate = this.beers.find(
              (element) => element.beername == this.myBeer.beername
            );
            if (duplicate != undefined) {
              this.$swal.fire("Jest już piwo o tej nazwie!");
            } else {
              this.myBeer.volume = parseInt(this.myBeer.volume);
              this.myBeer.voltage = this.myBeer.voltage.replace(",", ".");
              this.myBeer.voltage =
                Math.floor(parseFloat(this.myBeer.voltage) * 100) / 100;
              this.blockButton = true;

              await axios
                .post("https://piwo.tech/add/beer", this.myBeer)
                .then((res) => {
                  console.log(res);
                });
              axios
                .post("https://piwo.tech/upload/file", fd)
                .then(async (res) => {
                  this.infoText = "plik został przesłany, dodawanie posta";
                  let postData = {
                    who: this.$auth.user.data.username,
                    beer: this.myBeer.beername,
                    link: res.data.link,
                    date: new Date().getTime(),
                    desc: this.desc != "" ? this.desc : "brak opisu",
                    score: this.score,
                  };

                  await axios
                    .post("https://piwo.tech/add/post", postData)
                    .then((response) => {
                      this.infoText = "dodano post!";
                      this.$swal.fire("Dodano nowy post!");
                      this.$router.push("/posts");
                    });
                })
                .catch((err) => {
                  this.$swal.fire(
                    `Wystąpił błąd! Wyślij skrina adminowi i spróbuj ponownie. ${err}`
                  );
                });
            }
          } else
            this.$swal.fire(
              "Złe dane piwa! Czy na pewno wypełniłaś[eś] wszystko?"
            );
        } else this.$swal.fire("Oceń piwo!");
      } else this.$swal.fire("Dodaj zdjęcie!");
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