<template>
  <div class="logo-wrapper">
    <div
      class="icon-wrapper"
      :style="`width: ${width}px; height:  ${height}px;`"
    >
      <img
        :style="`width: ${width}px; height:  ${height}px;`"
        :src="this.logoType"
        alt=""
      />
    </div>
  </div>
</template>

<script>
  import logoIcon from '../../assets/icons/logo/wandzLogoIcon.svg';
  export default {
    name: 'NmgLogo',
    props: {
      type: {
        type: String,
        default: 'black',
      },
      width: {
        type: Number,
        default: 172,
      },
      height: {
        type: Number,
        default: 18,
      },
    },
    computed: {
      logoType() {
        return this.types[this.type];
      },
    },
    data() {
      return {
        logoIcon,
        types: {
          icon: logoIcon,
        },
      };
    },
  };
</script>

<style lang="scss" scoped>
  .logo-wrapper {
    display: inline-block;
  }
</style>
