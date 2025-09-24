import { ComponentBase } from './component-base.type';

export type LoadingBehavior = ComponentBase & {
    isLoading?: boolean;
    loadingText?: string;
    loadingType?: LoadingType;
};

export type LoadingType =
    | 'spinner'
    | 'dots'
    | 'ring'
    | 'ball'
    | 'bars'
    | 'infinity';
