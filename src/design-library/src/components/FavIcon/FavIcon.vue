<template>
  <img
    :src="imageSrc"
    :alt="`${src} icon`"
    :height="`${size}px`"
    :width="`${size}px`"
  />
</template>

<script lang="ts">
  import { PropType } from 'vue';
  import { FaviconSize } from './interfaces';
  import { FaviconStrategies } from '../../types/enums/FaviconStrategies';

  export default {
    name: 'FavIcon',
    props: {
      src: {
        type: String,
        default: 'unknown',
      },
      strategy: {
        type: String as PropType<FaviconStrategies>,
        default: FaviconStrategies.GOOGLE,
      },
      size: {
        type: Number as PropType<FaviconSize>,
        default: FaviconSize.SIXTEEN_BY_SIXTEEN,
      },
    },
    computed: {
      imageSrc() {
        // google will not find the icon and will return the empty globe icon, which is what we want to display in case we have no src/strategy
        if (!this.src || !this.strategy)
          return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${this.src}&size=${this.size}`;

        if (this.strategy === FaviconStrategies.GOOGLE)
          return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${this.src}&size=${this.size}`;
        if (this.strategy === FaviconStrategies.FAVICON_ICO) return this.src;
        return this.src;
      },
    },
  };
</script>
