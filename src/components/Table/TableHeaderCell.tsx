import React, { type HTMLProps } from 'react';

const TableHeaderCell: React.FC<HTMLProps<HTMLTableCellElement>> = ({
  children,
  className: propsClassName,
  ...props
}) => {
  const className =
    'block border-slate-900 bg-slate-900 p-2 first:rounded-tl-md last:rounded-tr-md dark:border-slate-100 dark:bg-slate-100 lg:table-cell' +
    (propsClassName ? ` ${propsClassName}` : '');

  return (
    <th scope="col" className={className} {...props}>
      {children}
    </th>
  );
};

export default TableHeaderCell;
