import React, { FC } from 'react';
import { LoadingProps } from './loading.type';
import classNames from 'classnames';
import { LoadingType } from '@/utils/types/components/loading-behavior.type';
import { Size, Theme } from '@/utils/types/components/component-base.type';

const loadingClasses: Record<LoadingType, string> = {
    ball: 'loading-ball',
    bars: 'loading-bars',
    dots: 'loading-dots',
    infinity: 'loading-infinity',
    ring: 'loading-ring',
    spinner: 'loading-spinner',
};
const themeClasses: Record<Theme, string> = {
    accent: 'text-accent',
    error: 'text-error',
    info: 'text-info',
    neutral: 'text-neutral',
    primary: 'text-primary',
    secondary: 'text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    default: '',
};
const sizeClasses: Record<Size, string> = {
    xs: 'loading-xs',
    sm: 'loading-sm',
    md: '',
    lg: 'loading-lg',
    xl: 'loading-xl',
};
const Loading: FC<LoadingProps> = ({
    type = 'spinner',
    theme = 'default',
    size = 'md',
    classname,
}) => {
    const loadingClassNames = classNames(
        'loading',
        classname,
        {
            [`${loadingClasses[type]}`]: type,
        },
        {
            [`${themeClasses[theme]}`]: theme,
        },
        {
            [`${sizeClasses[size]}`]: size,
        }
    );
    return <span className={loadingClassNames}></span>;
};

export default Loading;
