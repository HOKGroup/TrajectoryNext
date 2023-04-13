import { type HTMLProps } from 'react';
import classNames from 'classnames';

interface Props {
  isHeader?: boolean;
}

const TableRow: React.FC<Props & HTMLProps<HTMLTableRowElement>> = ({
  isHeader,
  children,
  className: propsClassName,
  ...props
}) => {
  const className = classNames(
    'block lg:table-row border-b',
    {
      'text-gray-50 dark:text-gray-950': isHeader,
      'odd:bg-white even:bg-slate-100 dark:odd:bg-slate-800 dark:even:bg-slate-900':
        !isHeader,
    },
    propsClassName
  );

  return (
    <tr className={className} {...props}>
      {children}
    </tr>
  );
};

export default TableRow;
