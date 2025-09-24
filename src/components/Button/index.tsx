import React, { FC } from 'react';

import classNames from 'classnames';

import { ButtonProps, ButtonShape, ButtonVariant } from './button.type';
import { Size, Theme } from '@/utils/types/components/component-base.type';
import Loading from '../Loading';

const variantClasses: Record<ButtonVariant, string> = {
    default: '',
    active: 'btn-active',
    dash: 'btn-dash',
    outline: 'btn-outline',
    soft: 'btn-soft',
};
const themeClasses: Record<Theme, string> = {
    accent: 'btn-accent',
    error: 'btn-error',
    info: 'btn-info',
    neutral: 'btn-neutral',
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    warning: 'btn-warning',
    default: '',
};
const sizeClasses: Record<Size, string> = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
    xl: 'btn-xl',
};
const shapeClasses: Record<ButtonShape, string> = {
    default: '',
    block: 'btn-block',
    circle: 'btn-circle',
    square: 'btn-square',
    wide: 'btn-wide',
};
const Button: FC<ButtonProps> = ({
    theme = 'primary',
    variant = 'default',
    size = 'md',
    isDisabled = false,
    isAnimated = false,
    shape = 'default',
    isLoading = false,
    loadingType = 'spinner',
    loadingText = 'Please wait...',
    type = 'button',
    isLink = false,
    children,
    className,
    ...rest
}) => {
    const classes = classNames(
        'btn',
        className,
        {
            'pointer-events-none opacity-80': isLoading,
        },
        { ['group']: isAnimated },
        { 'btn-disabled': isDisabled },
        { [`btn-link`]: isLink },
        { [`${variantClasses[variant]}`]: variant },
        { [`${themeClasses[theme]}`]: theme },
        { [`${sizeClasses[size]}`]: size },
        { [`${shapeClasses[shape]}`]: shape }
    );
    return (
        <button type={type} className={classes} {...rest}>
            {isLoading ? (
                <>
                    {loadingText}
                    <Loading size={size} type={loadingType} />
                </>
            ) : (
                <>{children}</>
            )}
        </button>
    );
};

export default Button;
