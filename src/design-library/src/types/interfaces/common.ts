import { VueConstructor } from 'vue';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IComponentWithProps {
  component: VueConstructor;
  props?: Record<string, any>;
}
