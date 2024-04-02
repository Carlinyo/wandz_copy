<template>
  <div>
    <StackedBar
      :score="0.9"
      variant="small-line"
    />
  </div>
</template>

<script>
  import StackedBar from './components/StackedBar/StackedBar.vue';
  export default {
    components: { StackedBar },
  };
</script>
