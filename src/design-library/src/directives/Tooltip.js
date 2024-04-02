import Vue from 'vue';
import { VTooltip, default as tool } from 'floating-vue';
import './tooltip.scss';

// -------------------- consts ------------ //
const possibleIconsType = ['info', 'none'];
const possibleTooltipType = ['small', 'medium', 'large'];
const possibleAttributes = ['tooltipType', 'options', 'iconType'];
// ---------------------------------------- //

const getAttributes = (name, props, value, defaultValue) => {
  const attrName = possibleAttributes.find((p) => p === name);
  if (!attrName) return defaultValue;
  const attr = props[attrName] || value[attrName];
  return attr || defaultValue;
};
// ------------- options ----------------- //
const buildDefaultOptions = () => ({
  trigger: 'hover',
  placement: 'bottom-right',
  arrowSelector: '.custom-tooltip-arrow',
  innerSelector: '.custom-tooltip-inner',
  template:
    '<div class="custom-tooltip" role="tooltip"><div class="custom-tooltip-arrow"></div><div class="custom-tooltip-inner"></div></div>',
});
const defaultPropsValues = (props, value) => {
  const context = props.context || '';
  const tooltipType = getAttributes('tooltipType', props, value, possibleTooltipType[0]);
  const propsOptions = getAttributes('options', props, value, {});
  const iconType = getAttributes('iconType', props, value, possibleIconsType[0]);
  return { options: propsOptions, context, tooltipType, iconType };
};
const buildClasses = (tooltipType) => [`custom-tooltip-inner-${tooltipType}`];
// -------------------------------------- //

// ------------------ classes ------------- //
const buildClassList = (el, iconType) => {
  const classList = iconType === possibleIconsType[1] ? ['tooltip-container-no-icon'] : ['tooltip-container'];
  el.className += ' ' + classList.join(' ');
};
// --------------------------------------- //

// ------------------ content ------------ //
const getLargeHtml = (title, content, icon) => {
  return `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center;">
        <div style="width: 100%; height: 30px; display: flex; align-items: center; justify-content: space-between;">
      <div style="font-family: Figtree; font-size: 14px;">${title}</div>
      <img style="padding-left: 8px; margin-top: -5px;" src="${icon}"/>
</div>
<div style="padding-top: 14px; font-size: 14px;">${content}</div>
</div>
        `;
};

const buildContent = (props, tooltipType) => {
  if (tooltipType === possibleTooltipType[2]) {
    const { title, content, icon } = props.content;
    return getLargeHtml(title, content, icon);
  }
  return props.content;
};
// -------------------------------------- //

const Tooltip = {
  bind(el, bindings, vnode) {
    // build options
    const defaultOptions = buildDefaultOptions();
    const props = defaultPropsValues(vnode.context.$props, bindings.value);
    const classes = buildClasses(props.tooltipType);
    const finalOptions = Object.assign(defaultOptions, props.options, { classes });
    const content = buildContent(bindings.value, props.tooltipType);
    // set options
    Object.assign(tool.options, finalOptions);
    Object.assign(bindings.modifiers, tool.options);
    Object.assign(bindings.value, tool.options, { classes, content });

    // build classes
    buildClassList(el, props.iconType || possibleIconsType[0]);
    VTooltip.bind(el, bindings, vnode);
  },
  update(el, bindings, vnode) {
    VTooltip.update(el, bindings, vnode);
  },
  unbind(el, bindings, vnode) {
    VTooltip.unbind(el, bindings, vnode);
  },
};

const TooltipPlugin = {
  install(Vue) {
    Vue.directive('nmgtooltip', Tooltip);
  },
};

Vue.use(TooltipPlugin);

export default Tooltip;
