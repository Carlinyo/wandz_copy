const elementsBlack = '#C6CBD3';

const VueScrollConfig = {
  vuescroll: {
    sizeStrategy: 'number',
  },
  scrollPanel: {
    scrollingX: false,
    scrollingY: true,
  },
  rail: {
    opacity: 0,
    specifyBorderRadius: false,
    gutterOfEnds: '2px',
    gutterOfSide: '4px',
    keepShow: false,
  },
  bar: {
    onlyShowBarOnScroll: false,
    background: elementsBlack,
    size: '10px',
    minSize: 0.2,
  },
  scroller: {
    preventDefault: true,
    preventDefaultOnMove: true,
  },
};
const VueScrollConfigKeepShow = {
  ...VueScrollConfig,
  bar: {
    onlyShowBarOnScroll: false,
    background: elementsBlack,
    size: '10px',
    minSize: 0.2,
    keepShow: true,
  },
};

export default VueScrollConfig;
export { VueScrollConfigKeepShow };
