import { type FC, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export enum ButtonType {
  Primary,
  Secondary,
  Warning,
}

interface ButtonProps {
  buttonType: ButtonType;
}

const Button: FC<
  ButtonProps &
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
> = ({ buttonType, children, ...props }) => {
  let className =
    'rounded-md px-4 py-1 text-lg font-semibold text-white shadow-sm outline-none enabled:focus:ring disabled:cursor-not-allowed disabled:shadow-inner dark:text-slate-950';

  if (buttonType === ButtonType.Primary) {
    className +=
      ' bg-blue-500 enabled:hover:bg-blue-600 enabled:focus:ring-blue-400 disabled:bg-blue-400';
  } else if (buttonType === ButtonType.Warning) {
    className +=
      ' bg-yellow-400 enabled:hover:bg-yellow-300 enabled:focus:ring-yellow-400 disabled:bg-yellow-500 dark:text-slate-950 dark:disabled:bg-yellow-300';
  } else if (buttonType === ButtonType.Secondary) {
    className +=
      ' bg-slate-300 enabled:hover:bg-slate-200 enabled:focus:ring-slate-300 disabled:bg-slate-950 dark:disabled:bg-slate-100';
  }

  className += ` ${props.className ?? ''}`;

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;
