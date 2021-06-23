<template>
  <div
    class="
      w-full
      h-full
      flex flex-col
      justify-center
      align-center
      pt-20
      text-center
    "
  >
    <h1 class="text-red-700 text-4xl">error 401 - unauthorized</h1>
    <h1 class="text-red-900 text-3xl mt-4">
      nie masz dostępu do tej podstrony
    </h1>
  </div>
</template>

<script>
export default {
  middleware: ["auth"],
};
</script>

<style lang="postcss" scoped>
</style>