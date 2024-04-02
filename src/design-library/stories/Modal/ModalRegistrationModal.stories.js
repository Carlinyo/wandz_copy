import registrationModal from '../../src/components/Modal/enhancements/RegistrationModal';
import Modal from '../../src/components/Modal';

export default {
  title: 'Overlay/Modal Registration',
  component: Modal,
  argTypes: {
    header: {
      control: { type: 'text' },
      defaultValue: 'Modal Header',
      name: 'Modal header',
    },
    image: {
      control: { type: 'text' },
      defaultValue:
        'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
      name: 'Image src',
    },
    subtitle: {
      control: { type: 'text' },
      defaultValue: '',
      name: 'Modal sub-header',
    },
    primaryButtonText: {
      control: { type: 'text' },
      defaultValue: 'CTA',
      name: 'Primary Button Text',
    },
    secondaryButtonText: {
      control: { type: 'text' },
      defaultValue: 'Back',
      name: 'Secondary Button Text',
    },
    primaryButtonProps: {
      control: { type: 'object' },
      defaultValue: {},
      name: 'primaryButtonProps',
    },
    secondaryButtonProps: {
      control: { type: 'object' },
      defaultValue: {},
      name: 'secondaryButtonProps',
    },
    contentText: {
      control: { type: 'text' },
      defaultValue: 'CONTENT',
      name: 'Content text',
    },
    contentDynamicTester: {
      control: { type: 'number' },
      defaultValue: 1,
      name: 'Number of rows in content',
    },
  },
  args: {
    header: 'Modal Header',
    image:
      'https://static.vecteezy.com/packs/media/components/global/search-explore-nav/img/vectors/term-bg-1-666de2d941529c25aa511dc18d727160.jpg',
    subtitle: '',
    primaryButtonText: 'CTA',
    secondaryButtonText: 'Back',
    primaryButtonProps: {},
    secondaryButtonProps: {},
    contentText: 'CONTENT',
    contentDynamicTester: 1,
  },
};

export const modalRegistration = (args, { argTypes }) => ({
  components: { registrationModal },
  props: Object.keys(argTypes),
  template: `
<div class="registration-modal">
  <registration-modal
    :modal-open="true"
    :header="header"
    :sub-header="subtitle"
    :modal-open="true"
    :primary-button="primaryButtonText"
    :secondary-button="secondaryButtonText"
    :primary-button-props="primaryButtonProps"
    :secondary-button-props="secondaryButtonProps"
    :image="image"
  >
    <div v-for="item in contentDynamicTester">{{  contentText  }}</div>
  </registration-modal>
</div>
  `,
});
