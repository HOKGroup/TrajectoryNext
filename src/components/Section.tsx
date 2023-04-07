import {
  type FC,
  type ReactNode,
  type DetailedHTMLProps,
  type HTMLAttributes,
} from 'react';

interface Props {
  title?: ReactNode;
  headingClassName?: string | undefined;
}

const Section: FC<
  Props & DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
> = ({
  title,
  children,
  className: propsClassName,
  headingClassName: propsHeadingClassName,
  ...props
}) => {
  const className = 'mb-8' + (propsClassName ? ` ${propsClassName}` : '');

  const headingClassName =
    'mb-3 text-xl font-semibold w-full' +
    (propsHeadingClassName ? ` ${propsHeadingClassName}` : '');

  return (
    <section className={className} {...props}>
      <h2 className={headingClassName}>{title}</h2>
      {children}
    </section>
  );
};

export default Section;
