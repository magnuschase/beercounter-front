<template>
  <div class="h-72 w-72 rounded-b-3xl bg-green-900 my-4 mx-4 relative">
    <div class="absolute top-8 left-4 w-28 h-28 rounded-full bg-green-900">
      <div
        class="
          w-28
          h-28
          rounded-full
          opacity-90
          bg-no-repeat bg-cover bg-center
        "
        :style="{ backgroundImage: `url(${post.picture})` }"
      ></div>
    </div>
    <div class="h-16 py-2 px-2 relative">
      <span
        class="
          absolute
          top-2
          left-2
          font-bold
          text-xs text-yellow-400
          mr-4
          opacity-60
          select-none
        "
        >SZEF</span
      >
      <div class="h-18 w-full font-bold text-right text-yellow-400 uppercase">
        <NuxtLink :to="{ path: 'profile', query: { username: post.name } }">{{
          post.name
        }}</NuxtLink>
      </div>
      <div class="h-18 w-full text-xs text-right text-yellow-400 font-medium">
        SEZON {{ post.season }}
      </div>
    </div>
    <div class="h-56 bg-special border-2 rounded-b-3xl border-green-900">
      <div class="h-28 w-full relative">
        <div
          class="absolute left-36 max-h-28 flex justify-start flex-wrap mt-1"
        >
          <div class="flex flex-col mr-4">
            <div class="text-yellow-400 font-bold">WYPIŁ</div>
            <div class="text-xxs font-medium">{{ post.drank }}</div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col">
        <div class="flex flex-col h-full px-4">
          <div class="text-xs h-12">Cytat: {{ post.quote }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["post"],
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