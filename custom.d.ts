declare module '*.svg' {
    import { DefineComponent } from 'vue';

    const content: DefineComponent<{}, {}, any> | string | undefined;
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

declare module '*.ts' {
    import typescript from 'typescript';
    export default typescript;
}
declare module '*.vue' {
    import Vue from 'vue';

    export default Vue;
}
