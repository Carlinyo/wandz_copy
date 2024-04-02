<template>
  <div class="search-input-container">
    <input
      ref="input"
      class="search-input body-small border border-radius-small"
      placeholder="Search"
      :style="{ borderRadius }"
      @input="onInput"
    />
    <img
      class="search-icon"
      :src="icons.search"
    />
  </div>
</template>
<script>
  import SearchIcon from '../../assets/icons/search/dropdown-search.svg';

  export default {
    name: 'SmallSearchInput',
    props: {
      value: {
        type: String,
        default: '',
      },
      borderRadius: {
        type: Number,
        default: 2,
      },
      autoFocus: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      icons() {
        return {
          search: SearchIcon,
        };
      },
    },
    mounted() {
      if (this.autoFocus) {
        this.$nextTick(() => this.$refs.input.focus());
      }
    },
    methods: {
      onInput(event) {
        this.$emit('input', event.target.value);
      },
    },
  };
</script>
<style lang="scss" scoped>
  @import '../../styles/colors/text.module.scss';

  .search-input-container {
    position: relative;
    width: 100%;

    ::placeholder {
      color: $txt-placeholder;
      opacity: 1;
    }
    .search-input {
      color: $txt-placeholder;
      height: 36px;
      width: 100%;
      outline: 0;
      padding: 8px 16px;
      box-sizing: border-box;
      font-size: 14px;
      &:focus {
        outline: 0;
      }
    }
    .search-icon {
      position: absolute;
      right: 16px;
      display: flex;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }
  }
</style>
