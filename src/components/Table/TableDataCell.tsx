import { type FC, type HTMLProps } from 'react';
import classNames from 'classnames';
import './TableDataCell.css';

const TableDataCell: FC<HTMLProps<HTMLTableCellElement>> = ({
  children,
  className: propsClassName,
  ...props
}) => {
  const className = classNames(
    'relative block before:flex before:items-center py-1 pl-[33%] pr-2 font-normal before:absolute before:bottom-0 before:left-2 before:top-0 before:py-1 before:font-semibold before:content-[attr(data-label)] dark:border-slate-600 lg:table-cell lg:border-0 lg:p-2 lg:before:content-none',
    propsClassName
  );

  return (
    <td scope="col" className={className} {...props}>
      {children}
    </td>
  );
};

export default TableDataCell;
