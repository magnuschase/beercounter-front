<template>
  <div class="container">
    <!-- POINTS TABLE -->
    <div>
      <div
        class="
          grid grid-cols-11
          bg-green-900
          border-b border-gray-900
          font-bold
        "
      >
        <div class="text-center">NR</div>
        <div class="col-span-2 text-center">PIWO</div>
        <div class="col-span-2 text-center">ILOŚĆ</div>
        <div class="col-span-2 text-center">W ML</div>
        <div class="col-span-2 text-center">% ALC</div>
        <div class="col-span-2 text-center">OCENA</div>
      </div>
      <div
        v-for="(beer, i) in prop"
        :key="beer.beername"
        class="
          grid grid-cols-11
          bg-green-700
          border-b border-green-800
          text-sm
          font-bold
        "
      >
        <div class="text-center flex items-center justify-center">
          {{ i + 1 }}
        </div>
        <div
          class="
            col-span-2
            text-xs text-center
            flex
            items-center
            justify-center
          "
        >
          {{ beer.beername }}
        </div>
        <div
          class="
            col-span-2
            text-center
            truncate
            flex
            justify-center
            items-center
          "
        >
          {{ beer.drank }}
        </div>
        <div
          class="
            col-span-2
            text-center
            truncate
            flex
            justify-center
            items-center
          "
        >
          {{ beer.volume }}ml
        </div>
        <div
          class="
            col-span-2
            text-center
            truncate
            flex
            justify-center
            items-center
          "
        >
          {{ beer.voltage }}
        </div>
        <div
          class="
            col-span-2
            text-center
            truncate
            flex
            justify-center
            items-center
          "
        >
          {{ Math.floor(beer.score * 100) / 100 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["prop", "sort"],
};
</script>

<style scoped>
</style>