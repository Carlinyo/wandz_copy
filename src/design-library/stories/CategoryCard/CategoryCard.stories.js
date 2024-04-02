import CategoryCard from '../../src/components/CategoryCard/index.ts';
import CartHeartIcon from '../../src/assets/icons/misc/shoppingCartHeart.svg';

export default {
  title: 'Category Card',
  argTypes: {
    title: {
      control: { type: 'string' },
      defaultValue: '',
      name: 'Title text',
    },
    description: {
      control: { type: 'string' },
      defaultValue: false,
      name: 'Description text',
    },
    icon: {
      control: { type: 'string' },
      defaultValue: '',
      name: 'Icon',
    },
    isSelected: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Is card is selected',
    },
    isComingSoon: {
      control: { type: 'boolean' },
      defaultValue: false,
      name: 'Is card is in Coming soon mode',
    },
    iconBgColor: {
      control: { type: 'string' },
      defaultValue: '#F1EBF8',
      name: 'Icon circle background color',
    },
  },
  args: {
    title: 'Purchase Prediction',
    description: 'How likely is the visitor to make a purchase by the end of the session',
    isSelected: false,
    isComingSoon: false,
    icon: CartHeartIcon,
    iconBgColor: '#F1EBF8',
  },
};

export const categoryCard = (args, { argTypes }) => ({
  components: { CategoryCard },
  props: Object.keys(argTypes),
  template: `
  <categoryCard
      :title="title"
      :description="description"
      :icon="CartHeartIcon"
      :is-selected="isSelected"
      :is-coming-soon="isComingSoon"
      :icon-bg-color="iconBgColor"
  >
  </categoryCard>`,
});
