<template>
  <div>
    <div class="container mx-auto h-full pt-20">
      <!-- MAIN NAV -->
      <h2 class="text-4xl font-bold text-green-900 text-center mb-4">
        EDYCJA PROFILU
      </h2>
      <div class="w-100 mx-4 mt-4 h-full pb-4 mb-6">
        <div class="mx-4 py-4">
          <div class="flex justify-center w-full h-20 cursor-pointer relative">
            <input
              type="file"
              @change="imageChange($event.target.files[0])"
              accept="image/*"
              capture="camera"
              class="
                opacity-0
                w-full
                h-full
                absolute
                top-0
                left-0
                cursor-pointer
              "
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
            </label>
          </div>
        </div>
        <button
          class="
            mainButton
            font-bold
            border-4 border-green-900
            hover:bg-green-900
            uppercase
          "
          @click="saveProfilePic"
        >
          ZMIEŃ PROFILOWE
        </button>
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
          type="password"
          name="password"
          v-model="pass"
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
          for="password"
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
          >Hasło</label
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
          @click="save"
        >
          ZMIEŃ HASŁO
        </button>
        <NuxtLink
          :to="{
            path: '/profile',
            query: { username: this.$route.query.username },
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
      pass: "",
      uploadText: "Dodaj zdjęcie",
    };
  },

  async fetch() {
    this.user = await axios
      .post("https://piwo.tech/get/userdata", {
        who: this.$route.query.username,
      })
      .then((res) => res.data);

    if (
      this.$auth.user.data.username == this.user.username ||
      this.$auth.user.data.admin
    ) {
      console.log("authorized");
    } else this.$router.push("/401");
  },

  methods: {
    imageChange: async function (image) {
      if (image != undefined) {
        this.file = image;
        this.uploadText = "Zdjęcie zostało dodane";
        console.log(this.file);
        const res = await imageConversion.compress(this.file, 0.8);
        this.file = res;
      }
    },
    saveProfilePic: async function () {
      if (this.file != undefined) {
        let fd = new FormData();
        fd.append("file", this.file);
        await axios
          .post("https://piwo.tech/upload/file", fd)
          .then(async (res) => {
            let userData = {
              who: this.$route.query.username,
              link: res.data.link,
            };
            await axios
              .post("https://piwo.tech/change/profilepic", userData)
              .then((res) => {
                this.$swal.fire(res.data.message);
                this.$router.push("/");
              });
          });
      } else this.$swal.fire("Nie dodałeś[aś] zdjęcia!");
    },
    save: async function () {
      let temporary = this.pass.replace(/\s/g, "");
      if (temporary.length > 0) {
        const data = {
          password: this.pass,
          who: this.$route.query.username,
        };
        await axios
          .post("https://piwo.tech/change/passwd", data)
          .then((res) => {
            this.$swal.fire(res.data.message);
            this.$router.push("/");
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