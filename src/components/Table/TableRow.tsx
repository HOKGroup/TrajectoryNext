import { type DetailedHTMLProps, type TableHTMLAttributes } from 'react';

interface Props {
  isHeader?: boolean;
}

const TableRow: React.FC<
  Props &
    DetailedHTMLProps<
      TableHTMLAttributes<HTMLTableRowElement>,
      HTMLTableRowElement
    >
> = ({ isHeader, children, className: propsClassName, ...props }) => {
  let className = 'border-2' + (propsClassName ? ` ${propsClassName}` : '');

  if (isHeader) {
    className +=
      ' border-slate-950 dark:border-slate-50 bg-slate-950 dark:bg-slate-50 text-slate-50 dark:text-slate-950';
  } else {
    className +=
      ' odd:bg-white even:bg-slate-100 dark:odd:bg-slate-800 dark:even:bg-slate-900';
  }

  return (
    <tr className={className} {...props}>
      {children}
    </tr>
  );
};

export default TableRow;
