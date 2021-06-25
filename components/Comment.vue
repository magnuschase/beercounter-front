<template>
  <div>
    <div
      class="
        w-100
        h-10
        mx-auto
        mt-4
        flex
        justify-start
        bg-green-800
        border-b border-gray-900
      "
    >
      <div class="flex w-6/12 h-full justify-start items-center">
        <img class="h-8 w-8 rounded-full mr-2" :src="comment.profilePic" />
        <span class="flex items-center text-yellow-400 truncate mr-2">{{
          comment.who
        }}</span>
      </div>
      <div class="flex w-6/12 h-full justify-end">
        <span class="text-yellow-400 text-sm flex items-center">{{
          comment.date.formatted
        }}</span>
      </div>
    </div>
    <div class="w-100 mx-auto flex justify-start bg-green-900 mb-4">
      <span class="text-sm px-2">{{ comment.content }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["comment"],
};
</script>

<style lang="postcss" scoped>
</style>