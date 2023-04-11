import { type FC, type HTMLProps } from 'react';
import classNames from 'classnames';

const SectionHeading: FC<HTMLProps<HTMLHeadingElement>> = ({
  className: propsClassName,
  children,
  ...props
}) => {
  const className = classNames(
    'sticky top-0 w-full bg-slate-50 py-2 text-xl font-semibold before:absolute before:bottom-0 before:right-full before:top-0 before:w-[9999px] before:bg-slate-50 after:absolute after:bottom-0 after:left-full after:top-0 after:w-[9999px] after:bg-slate-50 dark:bg-slate-950 before:dark:bg-slate-950 after:dark:bg-slate-950 z-10 before:z-10 after:z-10 mb-1 after:mb-1 before:mb-1',
    propsClassName
  );

  return (
    <h2 className={className} {...props}>
      {children}
    </h2>
  );
};

export default SectionHeading;
