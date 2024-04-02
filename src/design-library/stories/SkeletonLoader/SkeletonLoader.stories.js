import SkeletonLoader from '../../src/components/SkeletonLoader';

export default {
  components: { SkeletonLoader },
  title: 'SkeletonLoader',
  argTypes: {
    closeable: {
      control: { type: 'boolean' },
      defaultValue: true,
      name: 'Has X button',
    },
    text: {
      control: { type: 'text' },
      defaultValue: 'Some text',
      name: 'Pills text',
    },
  },
};

export const skeletonLoader = (args, { argTypes }) => ({
  components: { SkeletonLoader },
  props: Object.keys(argTypes),
  template: `<skeleton-loader />`,
});
