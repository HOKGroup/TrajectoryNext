import React, { type HTMLProps } from 'react';
import classNames from 'classnames';

const Table: React.FC<HTMLProps<HTMLTableElement>> = ({
  className: propsClassName,
  children,
  ...props
}) => {
  const className = classNames(
    'block border-separate border-spacing-0 text-left lg:table lg:rounded-none',
    propsClassName
  );

  return (
    <table className={className} {...props}>
      {children}
    </table>
  );
};

export default Table;
