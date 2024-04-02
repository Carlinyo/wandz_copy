export const containerSpacingDecorator = () => ({
  template: '<div style="margin: 3em; min-height: 220px;"><story/></div>',
});

export const docDescriptionContainer = (string) => `> <span style="color:#585961">${string}</span>`;

export const addDescription = (story, string) => {
  // eslint-disable-next-line no-param-reassign
  story.parameters = {
    docs: {
      description: {
        story: docDescriptionContainer(string),
      },
    },
  };
  return story;
};

export default {
  addDescription,
  docDescriptionContainer,
  containerSpacingDecorator,
};
