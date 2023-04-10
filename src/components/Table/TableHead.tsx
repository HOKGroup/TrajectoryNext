import { type HTMLProps } from 'react';
import classNames from 'classnames';

const TableHead: React.FC<HTMLProps<HTMLTableSectionElement>> = ({
  children,
  className: propsClassName,
  ...props
}) => {
  const className = classNames(
    'absolute left-[-9999px] top-[-9999px] block lg:relative lg:left-0 lg:top-0 lg:table-header-group',
    propsClassName
  );

  return (
    <thead className={className} {...props}>
      {children}
    </thead>
  );
};

export default TableHead;
