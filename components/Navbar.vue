<template>
  <nav
    v-if="this.$auth.loggedIn"
    class="
      flex
      fixed
      w-full
      items-center
      justify-between
      px-6
      mb-10
      h-16
      bg-beer-special
      border-b border-green-900
      text-green-600
      z-10
    "
  >
    <div class="flex items-center">
      <button class="mr-2" aria-label="Open Menu" @click="drawer">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-8 h-8"
        >
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      <span class="text-yellow-400 text-xs md:text-lg absolute right-4">{{
        timeUntil
      }}</span>
    </div>

    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        @keydown.esc="isOpen = false"
        v-show="isOpen"
        class="z-10 fixed inset-0 transition-opacity"
      >
        <div
          @click="isOpen = false"
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
        ></div>
      </div>
    </transition>
    <aside
      class="
        transform
        top-0
        left-0
        w-64
        bg-gray-800
        fixed
        h-full
        overflow-auto
        ease-in-out
        transition-all
        duration-300
        z-30
      "
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <span
        @click="isOpen = false"
        class="flex w-full items-center p-4 border-b text-yellow-400"
      >
        {{ timeUntil }}
      </span>
      <NuxtLink
        @click="isOpen = false"
        to="/report"
        class="
          flex
          items-center
          p-4
          hover:bg-gray-500
          hover:text-green-500
          cursor-pointer
          border-b border-gray-900
        "
        ><span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
            class="w-6 h-6 text-green-600"
          >
            <g data-name="Icon 1">
              <path
                d="M16.1,23H8.9a2,2,0,0,1-2-1.86L6,7l.87.64A2.07,2.07,0,0,0,8.41,8L9,7.85V12.5a.5.5,0,0,0,1,0V9.8A2.81,2.81,0,0,1,12.8,7H19l-.94,14.14A2,2,0,0,1,16.1,23Zm-9-14.14.82,12.22a1,1,0,0,0,1,.92h7.2a1,1,0,0,0,1-.92L18,8H12.8A1.81,1.81,0,0,0,11,9.8v2.7a1.5,1.5,0,0,1-3,0V9A3.09,3.09,0,0,1,7.09,8.86Z"
              />
              <path
                d="M20.57 17H17.5V16h3.07A1.43 1.43 0 0 0 22 14.57V11.43A1.43 1.43 0 0 0 20.57 10H18.5V9h2.07A2.43 2.43 0 0 1 23 11.43v3.14A2.43 2.43 0 0 1 20.57 17zM9.5 14A1.5 1.5 0 0 1 8 12.5V9a3 3 0 0 1-1.77-.58A3 3 0 0 1 5.14 5.08a3 3 0 0 1 2.13-2 2.94 2.94 0 0 1 2.2.3 3 3 0 0 1 4.37-.76A2.47 2.47 0 0 1 15.5 2a2.52 2.52 0 0 1 2 1h0A2.5 2.5 0 0 1 20 5.92h0A2.59 2.59 0 0 1 17.38 8H12.8A1.81 1.81 0 0 0 11 9.8v2.7A1.5 1.5 0 0 1 9.5 14zM9 7.85V12.5a.5.5 0 0 0 1 0V9.8A2.81 2.81 0 0 1 12.8 7h4.58A1.59 1.59 0 0 0 19 5.76a1.49 1.49 0 0 0-.33-1.22A1.6 1.6 0 0 0 17.3 4l-.33 0-.17-.3a1.55 1.55 0 0 0-2.53-.13l-.36.51-.41-.47A2 2 0 0 0 12 3a2 2 0 0 0-1.87 1.3L9.88 5 9.33 4.5A2 2 0 0 0 7.5 4.06a2 2 0 0 0-.68 3.55A2.07 2.07 0 0 0 8.41 8z"
              />
            </g>
          </svg>
        </span>
        <span>Zgłoś wypite piwo</span></NuxtLink
      >
      <NuxtLink
        @click="isOpen = false"
        to="/posts"
        class="
          flex
          items-center
          p-4
          hover:bg-gray-500
          hover:text-green-600
          cursor-pointer
          border-b border-gray-900
        "
        ><span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="w-6 h-4 text-green-600"
            viewBox="0 0 24 24"
          >
            <path
              d="M22 13v-13h-20v24h8.409c4.857 0 3.335-8 3.335-8 3.009.745 8.256.419 8.256-3zm-4-7h-12v-1h12v1zm0 3h-12v-1h12v1zm0 3h-12v-1h12v1zm-2.091 6.223c2.047.478 4.805-.279 6.091-1.179-1.494 1.998-5.23 5.708-7.432 6.881 1.156-1.168 1.563-4.234 1.341-5.702z"
            />
          </svg>
        </span>
        <span>Posty (piwa)</span></NuxtLink
      >
      <NuxtLink
        to="/others"
        @click="isOpen = false"
        class="
          flex
          items-center
          p-4
          hover:bg-gray-500
          hover:text-green-500
          cursor-pointer
        "
        ><span class="mr-2">
          <svg
            fill="currentColor"
            class="w-6 h-4 text-green-600"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path
              d="M21 11c0-.552-.448-1-1-1s-1 .448-1 1c0 .551.448 1 1 1s1-.449 1-1m3 .486c-1.184 2.03-3.29 4.081-5.66 5.323-1.336-1.272-2.096-2.957-2.103-4.777-.008-1.92.822-3.704 2.297-5.024 2.262.986 4.258 2.606 5.466 4.478m-6.63 5.774c-.613.255-1.236.447-1.861.573-1.121 1.348-2.796 2.167-5.287 2.167-.387 0-.794-.02-1.222-.061.647-.882.939-1.775 1.02-2.653-2.717-1.004-4.676-2.874-6.02-4.287-1.038 1.175-2.432 2-4 2 1.07-1.891 1.111-4.711 0-6.998 1.353.021 3.001.89 4 1.999 1.381-1.2 3.282-2.661 6.008-3.441-.1-.828-.399-1.668-1.008-2.499.429-.04.837-.06 1.225-.06 2.467 0 4.135.801 5.256 2.128.68.107 1.357.272 2.019.495-1.453 1.469-2.271 3.37-2.263 5.413.008 1.969.773 3.799 2.133 5.224"
            />
          </svg>
        </span>
        <span>Posty (inne)</span></NuxtLink
      >
      <NuxtLink
        @click="isOpen = false"
        to="/"
        class="
          flex
          items-center
          p-4
          hover:bg-gray-500
          hover:text-green-500
          cursor-pointer
        "
        ><span class="mr-2">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6 text-green-600"
          >
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
        </span>
        <span>Strona główna</span></NuxtLink
      >
      <NuxtLink
        @click="isOpen = false"
        :to="{
          path: '/profile',
          query: { username: this.$auth.user.data.username },
        }"
        class="
          flex
          items-center
          p-4
          hover:bg-gray-500
          hover:text-green-500
          cursor-pointer
        "
        ><span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-green-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.081 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h10.483l.704-3h1.615l.704 3h10.483l.005-1.241c.001-2.52-.198-3.975-3.177-4.663zm-8.231 1.904h-1.164l-.91-2h2.994l-.92 2z"
            />
          </svg>
        </span>
        <span>Twój profil</span></NuxtLink
      >
      <NuxtLink
        @click="isOpen = false"
        to="/users"
        class="
          flex
          items-center
          p-4
          hover:bg-gray-500
          hover:text-green-600
          cursor-pointer
          border-b border-gray-900
        "
        ><span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-green-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z"
            />
          </svg>
        </span>
        <span>Wszyscy użytkownicy</span></NuxtLink
      >

      <NuxtLink
        @click="isOpen = false"
        to="/beers"
        class="
          flex
          items-center
          p-4
          hover:bg-gray-500
          hover:text-green-600
          cursor-pointer
        "
        ><span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="w-6 h-4 text-green-600"
            viewBox="0 0 24 24"
          >
            <path
              d="M17 21.224v-12.772c1.106-.594 1.674-1.762 1.674-3.104 0-1.874-1.473-3.411-3.32-3.515-.768-1.068-2.221-1.833-3.739-1.833-.971 0-1.78.322-2.582.964-1.292-.422-2.747-.143-3.795.792-2.155-.342-4.238 1.244-4.238 3.501 0 1.396.819 2.581 2 3.15v12.817c0 .664-.336 1.203-1 1.203v1.573h16v-1.573c-.664 0-1-.539-1-1.203zm-9-.224h-2v-12.719c.672.422 1.516.406 2 .267v12.452zm7.154-13.707c-.627 0-1.184-.296-1.539-.756l-.451.316c-1.522 1.178-.113 3.303-.01 4.324.102.977-.505 1.712-1.458 1.712-.93 0-1.475-.786-1.401-1.712.078-.978 1.562-2.918-.083-4.438l-.623-.568c-.425.497-1.056.813-1.761.813-.605 0-1.155-.231-1.568-.611-.354.487-.927.804-1.575.804-2.716 0-2.817-3.889 0-3.889.398 0 .77.12 1.077.326.384-.751 1.163-1.266 2.065-1.266.591 0 1.131.222 1.54.586.494-.814 1.39-1.359 2.412-1.359 1.255 0 2.32.82 2.685 1.955.213-.082.445-.126.689-.126 1.072 0 1.943.871 1.943 1.944s-.869 1.945-1.942 1.945zm7.846 5.159c0 2.539-1.791 5.75-5 6.963v-2.16c3.154-1.83 3.969-6.255 1.553-6.255h-1.553v-2h1.912c2.144 0 3.088 1.534 3.088 3.452z"
            />
          </svg>
        </span>
        <span>Ranking piw</span></NuxtLink
      >
      <NuxtLink
        @click="isOpen = false"
        to="/report/puke"
        class="
          flex
          items-center
          p-4
          hover:bg-gray-500
          hover:text-green-500
          cursor-pointer
        "
        ><span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="w-6 h-4 text-green-600"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 16c2.947 0 5.333-2.365 5.333-5.284 0-2.917-2.087-5.918-5.333-10.716-3.246 4.798-5.332 7.799-5.332 10.716 0 2.919 2.385 5.284 5.332 5.284zm-.018-12.587c.311.484.685 1.325.685 2.213 0 2.606-2.667 3.033-2.667 1.447 0-1.088 1.326-2.696 1.982-3.66zm.018 16.587c-2.367 0-5.711-.614-7.285-2.356.473-.294 1.15-.61 2.021-.889.923.589 2.702 1.245 5.264 1.245s4.341-.656 5.265-1.245c.87.278 1.548.595 2.022.889-1.574 1.742-4.92 2.356-7.287 2.356zm11.997-2c0 3.313-5.37 6-11.997 6-6.625 0-11.997-2.687-11.997-6l.003-.126c.043-1.009.615-1.921 1.505-2.398s1.965-.448 2.829.074l.023.014c-1.513.763-2.361 1.678-2.361 2.436 0 1.631 3.895 4 9.998 4s9.998-2.369 9.998-4c0-.757-.847-1.671-2.358-2.436l.021-.012c.877-.529 1.969-.548 2.864-.052s1.458 1.434 1.472 2.458v.042zm-4.999-4.031c1.453-1.406 3.064-.182 4.402-1.477.418-.403.603-.902.603-1.384 0-1.279-1.481-2.261-3.021-1.436-1.234.661-1.921 2.349-1.984 4.297zm.178-5.067c.63-1.037 1.749-.57 2.329-1.524.688-1.133-.729-2.29-1.829-1.269-.615.57-.76 1.654-.5 2.793zm-16.153.77c-1.539-.825-3.021.157-3.021 1.436 0 .482.185.98.602 1.384 1.338 1.295 2.95.071 4.402 1.477-.062-1.948-.748-3.636-1.983-4.297zm1.307-3.563c-1.1-1.021-2.518.136-1.83 1.269.58.954 1.699.487 2.33 1.524.259-1.139.115-2.223-.5-2.793z"
            />
          </svg>
        </span>
        <span>Zgłoś rzyganie</span></NuxtLink
      >
      <NuxtLink
        to="/report/other"
        @click="isOpen = false"
        class="
          flex
          items-center
          p-4
          hover:bg-gray-500
          hover:text-green-500
          cursor-pointer
        "
        ><span class="mr-2">
          <svg
            fill="currentColor"
            class="w-6 h-4 text-green-600"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path
              d="M21 11c0-.552-.448-1-1-1s-1 .448-1 1c0 .551.448 1 1 1s1-.449 1-1m3 .486c-1.184 2.03-3.29 4.081-5.66 5.323-1.336-1.272-2.096-2.957-2.103-4.777-.008-1.92.822-3.704 2.297-5.024 2.262.986 4.258 2.606 5.466 4.478m-6.63 5.774c-.613.255-1.236.447-1.861.573-1.121 1.348-2.796 2.167-5.287 2.167-.387 0-.794-.02-1.222-.061.647-.882.939-1.775 1.02-2.653-2.717-1.004-4.676-2.874-6.02-4.287-1.038 1.175-2.432 2-4 2 1.07-1.891 1.111-4.711 0-6.998 1.353.021 3.001.89 4 1.999 1.381-1.2 3.282-2.661 6.008-3.441-.1-.828-.399-1.668-1.008-2.499.429-.04.837-.06 1.225-.06 2.467 0 4.135.801 5.256 2.128.68.107 1.357.272 2.019.495-1.453 1.469-2.271 3.37-2.263 5.413.008 1.969.773 3.799 2.133 5.224"
            />
          </svg>
        </span>
        <span>Zgłoś inne</span></NuxtLink
      >
      <NuxtLink
        @click="isOpen = false"
        to="/fame"
        class="
          flex
          items-center
          p-4
          hover:bg-gray-500
          hover:text-green-600
          cursor-pointer
          border-b border-gray-900
        "
        ><span class="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-green-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M17.997 18h-11.995l-.002-.623c0-1.259.1-1.986 1.588-2.33 1.684-.389 3.344-.736 2.545-2.209-2.366-4.363-.674-6.838 1.866-6.838 2.491 0 4.226 2.383 1.866 6.839-.775 1.464.826 1.812 2.545 2.209 1.49.344 1.589 1.072 1.589 2.333l-.002.619zm4.811-2.214c-1.29-.298-2.49-.559-1.909-1.657 1.769-3.342.469-5.129-1.4-5.129-1.265 0-2.248.817-2.248 2.324 0 3.903 2.268 1.77 2.246 6.676h4.501l.002-.463c0-.946-.074-1.493-1.192-1.751zm-22.806 2.214h4.501c-.021-4.906 2.246-2.772 2.246-6.676 0-1.507-.983-2.324-2.248-2.324-1.869 0-3.169 1.787-1.399 5.129.581 1.099-.619 1.359-1.909 1.657-1.119.258-1.193.805-1.193 1.751l.002.463z"
            />
          </svg>
        </span>
        <span>Hall of Fame</span></NuxtLink
      >
      <div class="w-full xs:fixed xs:bottom-0">
        <span
          @click="logout()"
          class="
            flex
            items-center
            p-4
            hover:bg-gray-500
            hover:text-green-500
            cursor-pointer
          "
          ><span class="mr-2">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              class="w-6 h-6"
            >
              <path
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
          </span>
          <span>Wyloguj się</span></span
        >
      </div>
    </aside>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      timeUntil: "",
      finishDate: new Date("Aug 14, 2021 08:00:00").getTime(),
    };
  },
  methods: {
    drawer: function () {
      this.isOpen = !this.isOpen;
    },
    tripTimer: function () {
      this.isOpen = false;
      let timer = setInterval(() => {
        let now = new Date().getTime();
        let distance = this.finishDate - now;
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (days >= 0)
          this.timeUntil = `zostało ${days}d ${hours}h ${minutes}min ${seconds}s do mazur`;
        else {
          this.timeUntil = "mazury edition";
          clearInterval(timer);
        }
      }, 1000);
    },
    logout: async function () {
      this.isOpen = false;
      try {
        await this.$auth.logout().then(() => {
          this.$swal.fire("Zostałeś wylogowany!");
          this.$router.push("/login");
        });
      } catch (err) {
        console.log(err);
        this.$swal.fire(
          `Wystąpił błąd! Zrób skrina i poinformuj admina ${err}`
        );
      }
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
    $route() {
      this.isOpen = false;
    },
  },
  mounted() {
    this.tripTimer();
  },
};
</script>

<style lang="postcss" scoped>
.bg-beer-special {
  background-color: #040f0f;
}
</style>