import React, { type DetailedHTMLProps, type TableHTMLAttributes } from 'react';

const TableHeaderCell: React.FC<
  DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >
> = ({ children, className: propsClassName, ...props }) => {
  const className = 'p-2' + (propsClassName ? ` ${propsClassName}` : '');

  return (
    <th scope="col" className={className} {...props}>
      {children}
    </th>
  );
};

export default TableHeaderCell;
