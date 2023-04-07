import React, { type DetailedHTMLProps, type TableHTMLAttributes } from 'react';

const TableDataCell: React.FC<
  DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >
> = ({ children, className: propsClassName, ...props }) => {
  const className =
    'p-2 font-normal' + (propsClassName ? ` ${propsClassName}` : '');

  return (
    <th scope="col" className={className} {...props}>
      {children}
    </th>
  );
};

export default TableDataCell;
