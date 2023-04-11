import { type FC, type HTMLProps } from 'react';
import classNames from 'classnames';

const SectionHeading: FC<HTMLProps<HTMLHeadingElement>> = ({
  className: propsClassName,
  children,
  ...props
}) => {
  const className = classNames('text-xl font-semibold w-full', propsClassName);

  return (
    <h2 className={className} {...props}>
      {children}
    </h2>
  );
};

export default SectionHeading;
