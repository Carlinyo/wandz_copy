declare module '*.svg' {
  import Vue, { VueConstructor } from 'vue';

  const content: VueConstructor<Vue>;
  export default content;
}

declare module '*.json' {
  const content: any;
  export default content;
}

declare module '*.png';

declare module '*.scss' {
  const content: any;
  export default content;
}
