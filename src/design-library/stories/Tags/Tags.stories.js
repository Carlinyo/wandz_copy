import Tags from '../../src/components/Tags';

export default {
  title: 'UI Element/Tags',
  argTypes: {
    type: {
      options: ['red', 'pink', 'orange', 'yellow', 'green', 'azure', 'blue', 'purple'],
      control: { type: 'select' },
      name: 'Tags type',
    },
    text: {
      control: { type: 'text' },
      name: 'Tags text',
    },
    backgroundColor: {
      control: { type: 'color' },
      name: 'Background color',
    },
    textColor: {
      control: { type: 'color' },
      name: 'Text color',
    },
  },
  args: {
    type: 'red',
    text: 'Some text',
    backgroundColor: '',
    textColor: '',
  },
};

export const tags = (args, { argTypes }) => ({
  components: { Tags },
  props: Object.keys(argTypes),
  template: `
  <tags
    :text="text"
    :type="type"
    :backgroundColor="backgroundColor"
    :textColor="textColor"
  >
  </tags>`,
});
