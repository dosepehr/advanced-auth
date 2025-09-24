import { ComponentBase } from '@/utils/types/components/component-base.type';
import { LoadingType } from '@/utils/types/components/loading-behavior.type';

export type LoadingProps = Omit<ComponentBase, 'isDisabled'> & {
    type?: LoadingType;
};
