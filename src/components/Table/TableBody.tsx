import { type FC, type HTMLProps } from 'react';
import classNames from 'classnames';

const TableBody: FC<HTMLProps<HTMLTableSectionElement>> = ({
  children,
  className: propsClassName,
  ...props
}) => {
  const className = classNames('block lg:table-row-group', propsClassName);

  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
};

export default TableBody;
