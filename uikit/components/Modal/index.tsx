import dynamic from 'next/dynamic';

const Modal = dynamic(import('./Modal'), {ssr: false});
export {Modal};
export type {ModalProps} from './types';
