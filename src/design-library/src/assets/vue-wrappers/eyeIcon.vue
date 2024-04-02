<template>
  <div
    @mouseover="handleMouseOver"
    @onmouseleave="handleMouseLeave"
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="Frame"
        clip-path="url(#clip0_866_8265)"
      >
        <g id="Group">
          <path
            id="Vector"
            d="M15.6211 7.01311C13.8611 5.07311 10.9545 3.01311 8.00113 3.06644C5.0478 3.11978 2.14113 5.07311 0.381133 7.01311C0.130964 7.28606 -0.0078125 7.64286 -0.0078125 8.01311C-0.0078125 8.38336 0.130964 8.74016 0.381133 9.01311C1.55447 10.2798 4.49447 12.9331 8.00113 12.9331C11.5078 12.9331 14.4411 10.2664 15.6211 8.97978C15.862 8.70885 15.995 8.35895 15.995 7.99644C15.995 7.63394 15.862 7.28404 15.6211 7.01311ZM4.93447 7.99978C4.93447 7.39325 5.11432 6.80034 5.45129 6.29603C5.78826 5.79172 6.26721 5.39866 6.82757 5.16655C7.38793 4.93444 8.00453 4.87371 8.59941 4.99204C9.19429 5.11036 9.74071 5.40244 10.1696 5.83132C10.5985 6.2602 10.8905 6.80663 11.0089 7.4015C11.1272 7.99638 11.0665 8.61298 10.8344 9.17334C10.6023 9.7337 10.2092 10.2126 9.70488 10.5496C9.20057 10.8866 8.60766 11.0664 8.00113 11.0664C7.1878 11.0664 6.40778 10.7433 5.83267 10.1682C5.25756 9.59313 4.93447 8.81311 4.93447 7.99978Z"
            :fill="calcColor"
          />
          <path
            id="Vector_2"
            d="M8.00118 9.33317C8.73756 9.33317 9.33451 8.73622 9.33451 7.99984C9.33451 7.26346 8.73756 6.6665 8.00118 6.6665C7.2648 6.6665 6.66785 7.26346 6.66785 7.99984C6.66785 8.73622 7.2648 9.33317 8.00118 9.33317Z"
            :fill="calcColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_866_8265">
          <rect
            width="16"
            height="16"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>

<script lang="ts">
  import {} from './utils/enums';
  import Colors from '../../../styles/colors/text.module.scss';

  export default {
    name: 'eyeIcon',
    props: {
      color: {
        type: String,
        default: Colors.txtPrimary,
      },
      colorOnHover: {
        type: String,
        default: Colors.txtPrimary,
      },
      width: {
        type: Number,
        default: 24,
      },
      height: {
        type: Number,
        default: 24,
      },
      masked: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      calcColor() {
        return this.isHover ? this.colorOnHover : this.color;
      },
    },
    data() {
      return {
        isHover: false,
      };
    },
    methods: {
      handleMouseOver() {
        this.isHover = true;
      },
      handleMouseLeave() {
        this.isHover = false;
      },
    },
  };
</script>

<style scoped lang="scss">
  .right {
    transform: rotate(180deg);
  }

  .up {
    transform: rotate(90deg);
  }

  .down {
    transform: rotate(270deg);
  }
</style>
