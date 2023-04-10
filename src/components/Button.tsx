import {
  forwardRef,
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type ForwardRefRenderFunction,
} from 'react';
import classNames from 'classnames';

export enum ButtonType {
  Primary,
  Secondary,
  Warning,
}

interface ButtonProps {
  buttonType: ButtonType;
}

const Button: ForwardRefRenderFunction<
  HTMLButtonElement,
  ButtonProps &
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> = ({ buttonType, children, className: propsClassName, ...props }, ref) => {
  const className = classNames(
    'rounded-md px-4 py-1 text-lg font-semibold shadow-sm outline-none enabled:focus:ring disabled:cursor-not-allowed disabled:shadow-none dark:shadow-slate-800',
    {
      'bg-blue-500 enabled:hover:bg-blue-600 enabled:focus:ring-blue-400 disabled:bg-blue-200 text-slate-50 dark:disabled:text-slate-700':
        buttonType === ButtonType.Primary,
      'bg-yellow-400 enabled:hover:bg-yellow-300 enabled:focus:ring-yellow-400 disabled:bg-yellow-200 disabled:text-slate-400 text-slate-950':
        buttonType === ButtonType.Warning,
      'bg-slate-400 dark:bg-slate-200 dark:enabled:hover:bg-slate-300 enabled:hover:bg-slate-200 enabled:focus:ring-slate-300 disabled:bg-slate-200 dark:disabled:bg-slate-400 text-slate-50 dark:text-slate-950 dark:disabled:text-slate-600':
        buttonType === ButtonType.Secondary,
    },
    propsClassName
  );

  return (
    <button {...props} className={className} ref={ref}>
      {children}
    </button>
  );
};

const ForwardRefButton = forwardRef(Button);

export default ForwardRefButton;
