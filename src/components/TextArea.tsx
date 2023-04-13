import classNames from 'classnames';
import { type FC, type HTMLProps } from 'react';

const TextArea: FC<HTMLProps<HTMLTextAreaElement>> = ({
  className: propsClassName,
  ...props
}) => {
  return (
    <textarea
      {...props}
      className={classNames(
        'block w-full rounded-md border-2 px-2 py-1 outline-none focus:border-transparent focus:ring focus:ring-blue-300 enabled:bg-white disabled:cursor-not-allowed disabled:bg-slate-100 dark:text-gray-950 dark:disabled:bg-slate-200',
        propsClassName
      )}
    />
  );
};

export default TextArea;
