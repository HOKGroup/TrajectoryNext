import { type FC, type HTMLProps } from 'react';
import classNames from 'classnames';

const Section: FC<HTMLProps<HTMLElement>> = ({
  children,
  className: propsClassName,
  ...props
}) => {
  const className = classNames('flex flex-col gap-4', propsClassName);

  return (
    <section className={className} {...props}>
      {children}
    </section>
  );
};

export default Section;
