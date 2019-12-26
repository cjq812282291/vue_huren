<template>
  <div>
    <comment :id="this.$route.params.id"></comment>
  </div>
</template>

<script>
import comment from '../Subcomponents/comment'
export default {
  components: {
    comment
  }
}
</script>

<style>
</style>
