<template>
  <div class="container">
    <div class="w-full h-24 mb-4 flex justify-around">
      <div class="w-16 h-100 text-xs text-center">
        <p>2</p>
        <p class="truncate">{{ prop[1].username || "" }}</p>
        <div class="w-16 h-16 bg-green-900 rounded-b-3xl">
          <img
            :src="prop[1].profilePic"
            class="w-full h-full opacity-80 rounded-b-3xl"
          />
        </div>
      </div>
      <div class="w-16 h-100 text-xs text-center">
        <p>1</p>
        <p class="truncate">{{ prop[0].username || "" }}</p>
        <div class="w-16 h-16 bg-green-900 rounded-b-3xl">
          <img
            :src="prop[0].profilePic || ''"
            class="w-full h-full opacity-80 rounded-b-3xl"
          />
        </div>
      </div>
      <div class="w-16 h-100 text-xs text-center">
        <p>3</p>
        <p class="truncate">{{ prop[2].username || "" }}</p>
        <div class="w-16 h-16 bg-green-900 rounded-b-3xl">
          <img
            :src="prop[2].profilePic || ''"
            class="w-full h-full opacity-80 rounded-b-3xl"
          />
        </div>
      </div>
    </div>
    <!-- POINTS TABLE -->
    <div v-if="sort == 'Points'">
      <div
        class="grid grid-cols-9 bg-green-900 border-b border-gray-900 font-bold"
      >
        <div class="text-center">NR</div>
        <div class="col-span-2 text-center">USER</div>
        <div class="col-span-2 text-center">WYPITE</div>
        <div class="col-span-2 text-center">ALKOHOL</div>
        <div class="col-span-2 text-center">PUNKTY</div>
      </div>
      <NuxtLink
        :to="{
          path: '/profile',
          query: { username: user.username },
        }"
        v-for="(user, i) in prop"
        :key="user.username"
        class="
          grid grid-cols-9
          bg-green-700
          border-b border-green-800
          text-sm
          font-bold
        "
      >
        <div class="text-center">{{ i + 1 }}</div>
        <div class="col-span-2 text-center truncate">{{ user.username }}</div>
        <div class="col-span-2 text-center truncate">{{ user.drank }}</div>
        <div class="col-span-2 text-center truncate">
          {{ Math.floor(user.alcohol) }}
        </div>
        <div class="col-span-2 text-center truncate">
          {{ Math.floor(user.points) }}
        </div>
      </NuxtLink>
    </div>
    <!-- PUKES TABLE -->
    <div v-if="sort == 'Pukes'">
      <div
        class="grid grid-cols-7 bg-green-900 border-b border-gray-900 font-bold"
      >
        <div class="text-center">NR</div>
        <div class="col-span-2 text-center">USER</div>
        <div class="col-span-2 text-center">ZWROTY</div>
        <div class="col-span-2 text-center">PUNKTY</div>
      </div>
      <NuxtLink
        :to="{
          path: '/profile',
          query: { username: user.username },
        }"
        v-for="(user, i) in prop"
        :key="user.username"
        class="
          grid grid-cols-7
          bg-green-700
          border-b border-green-800
          text-sm
          font-bold
        "
      >
        <div class="text-center">{{ i + 1 }}</div>
        <div class="col-span-2 text-center truncate">{{ user.username }}</div>
        <div class="col-span-2 text-center truncate">{{ user.pukes }}</div>
        <div class="col-span-2 text-center truncate">
          {{ user.points }}
        </div>
      </NuxtLink>
    </div>
    <!-- OTHERS TABLE -->
    <div v-if="sort == 'Other'">
      <div
        class="grid grid-cols-7 bg-green-900 border-b border-gray-900 font-bold"
      >
        <div class="text-center">NR</div>
        <div class="col-span-2 text-center">USER</div>
        <div class="col-span-2 text-center">INNE</div>
        <div class="col-span-2 text-center">PUNKTY</div>
      </div>
      <NuxtLink
        :to="{
          path: '/profile',
          query: { username: user.username },
        }"
        v-for="(user, i) in prop"
        :key="user.username"
        class="
          grid grid-cols-7
          bg-green-700
          border-b border-green-800
          text-sm
          font-bold
        "
      >
        <div class="text-center">{{ i + 1 }}</div>
        <div class="col-span-2 text-center truncate">{{ user.username }}</div>
        <div class="col-span-2 text-center truncate">{{ user.others }}</div>
        <div class="col-span-2 text-center truncate">
          {{ Math.floor(user.points) }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: ["prop", "sort"],
};
</script>

<style>
</style>