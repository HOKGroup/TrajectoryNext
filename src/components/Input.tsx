import classNames from 'classnames';
import { FC, type HTMLProps } from 'react';

const Input: FC<HTMLProps<HTMLInputElement>> = ({
  className: propsClassName,
  children,
  ...props
}) => {
  const className = classNames(
    'w-full rounded-md border-2 px-2 py-1 text-slate-950 outline-none focus:border-transparent focus:ring focus:ring-blue-300',
    propsClassName
  );

  return (
    <input className={className} {...props}>
      {children}
    </input>
  );
};

export default Input;
