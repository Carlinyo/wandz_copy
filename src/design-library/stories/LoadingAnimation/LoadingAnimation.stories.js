import LoadingAnimation from '../../src/components/LoadingAnimation';

export default {
  title: 'Animation/Loading Animation',
};

export const loadingAnimation = () => ({
  components: { LoadingAnimation },
  template: '<loading-animation></loading-animation>',
});
