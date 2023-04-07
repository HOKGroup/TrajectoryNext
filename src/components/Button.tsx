import { type FC, ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export enum ButtonType {
  Primary,
  Secondary,
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
    'rounded-md px-4 py-1 text-white outline-none enabled:focus:ring shadow-sm disabled:cursor-not-allowed disabled:shadow-inner';

  if (buttonType === ButtonType.Primary) {
    className +=
      ' bg-blue-500 enabled:hover:bg-blue-600 enabled:focus:ring-blue-400 disabled:bg-blue-400';
  } else if (buttonType === ButtonType.Secondary) {
    className +=
      ' bg-yellow-400 enabled:hover:bg-yellow-400 enabled:focus:ring-yellow-400 disabled:bg-yellow-500';
  }

  className += ` ${props.className ?? ''}`;

  return (
    <button {...props} className={className}>
      {children}
    </button>
  );
};

export default Button;
