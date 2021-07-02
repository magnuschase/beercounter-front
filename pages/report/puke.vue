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
        WYBIERZ UŻYTKOWNIKA
      </h2>
      <!-- COMPONENT BOX -->
      <div class="w-100 mx-4 mt-4 h-full pb-4">
        <v-select
          class="bigSelect bg-green-900 rounded-md"
          :options="users"
          v-model="selected"
          label="username"
        ></v-select>
      </div>
      <div
        class="
          outline
          relative
          border-green-900 border-2
          focus-within:border-green-500
          mx-4
          mt-8
          mb-8
        "
      >
        <input
          type="text"
          name="where"
          v-model="where"
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
          >Gdzie</label
        >
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
        <NuxtLink to="/">
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
      users: [],
      selected: null,
      switchButtonText: "Mojego piwa nie ma na liście",
      file: undefined,
      uploadText: "Dodaj zdjęcie",
      desc: "",
      where: "",
      blockButton: false,
      encodedFile: null,
      infoText: "trwa przesyłanie pliku",
      previewImg: null,
    };
  },
  async fetch() {
    this.users = await axios
      .post("https://piwo.tech/get/users")
      .then((res) => res.data);
    this.selected = this.$auth.user.data;
  },
  methods: {
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
    addPost: async function () {
      if (this.file != undefined) {
        let fd = new FormData();
        fd.append("file", this.file);

        let temporary = this.desc.replace(/\s/g, "");
        this.desc = temporary.length > 0 ? this.desc : "brak opisu";
        let temporaryWhere = this.where.replace(/\s/g, "");
        this.where = temporaryWhere.length > 0 ? this.where : "brak informacji";

        if (this.desc.length > 80) {
          this.desc = this.desc.slice(0, 77);
          this.desc += "...";
        }

        if (this.where.length > 80) {
          this.where = this.where.slice(0, 77);
          this.where += "...";
        }

        if (this.selected != null) {
          this.blockButton = true;

          await axios
            .post("https://piwo.tech/upload/file", fd)
            .then(async (res) => {
              this.infoText = "plik został przesłany, dodawanie posta";
              let pukeData = {
                who: this.selected.username,
                where: this.where,
                link: res.data.link,
                desc: this.desc,
                date: new Date().getTime(),
              };
              await axios
                .post("https://piwo.tech/add/puke", pukeData)
                .then((response) => {
                  this.infoText = "dodano post!";
                  this.$swal.fire("Dodano nowy post!");
                  this.$router.push("/pukes");
                });
            })
            .catch((err) => {
              this.$swal.fire(
                `Wystąpił błąd! Wyślij skrina adminowi i spróbuj ponownie. ${err}`
              );
            });
        } else this.$swal.fire("Wybierz użytkownika!");
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