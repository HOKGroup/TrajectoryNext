import React, { type DetailedHTMLProps, type TableHTMLAttributes } from 'react';

const Table: React.FC<
  DetailedHTMLProps<TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>
> = ({ className: propsClassName, children, ...props }) => {
  const className =
    'text-left text-sm lg:text-base' +
    (propsClassName ? ` ${propsClassName}` : '');

  return (
    <table className={className} {...props}>
      {children}
    </table>
  );
};

export default Table;
