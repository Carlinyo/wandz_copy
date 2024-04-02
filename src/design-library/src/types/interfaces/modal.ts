import { VueConstructor } from 'vue';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IModalProps {
  modalOpen?: boolean;
  closeable?: boolean;
  title: string;
  subtitle?: string;
  content?: string;
  primaryButtonText?: string;
  primaryButtonProps?: any;
  secondaryButtonText?: string;
  secondaryButtonProps?: any;
  secondaryButtonStyleType?: string;
  closeButtonText?: string;
  modalSize?: string;
  customModalClass?: string | string[];
  customBodyClass?: string;
  closeOnClickAway?: boolean;
  showConfirmOverlay?: boolean;
  overlayText?: string;
  overlayReturnCta?: string;
  overlayExitCta?: string;
  doBeforeCloseModal?: () => {};
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IModalContent {
  component: VueConstructor;
  props?: any; // props provided to modal content component
}
