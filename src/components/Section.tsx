import { type FC, type HTMLProps } from 'react';
import classNames from 'classnames';

const Section: FC<HTMLProps<HTMLElement>> = ({
  children,
  className: propsClassName,
  ...props
}) => {
  const className = classNames('flex flex-col', propsClassName);

  return (
    <section className={className} {...props}>
      <div className="gap-4">{children}</div>
    </section>
  );
};

export default Section;
