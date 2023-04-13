import classNames from 'classnames';
import ReactSelect, { type Props, type GroupBase } from 'react-select';

function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return (
    <ReactSelect
      unstyled={true}
      isClearable={true || props.isClearable}
      menuPlacement={'auto' || props.menuPlacement}
      {...props}
      classNames={{
        dropdownIndicator: (_state) => 'text-black/50 cursor-pointer',
        indicatorSeparator: (_state) => 'bg-black/20 mx-2',
        clearIndicator: (_state) => 'text-black/50 cursor-pointer',
        control: (state) =>
          classNames(
            'border-2 px-2 rounded-md focus:outline-none bg-white',
            {
              'ring ring-blue-300 outline-none border-transparent':
                state.isFocused,
            },
            {
              'text-black': props.value,
              'text-black/50': !props.value,
            },
            props.classNames?.control && props.classNames.control(state)
          ),
        menu: (_state) => 'mt-2 border-2 bg-white rounded-md drop-shadow-md',
        noOptionsMessage: (_state) => 'text-black/50',
        option: (state) =>
          'px-2 leading-9 dark:text-slate-950' +
          (state.isFocused ? ' bg-blue-200' : '') +
          (state.isSelected ? ' bg-blue-500 !text-white' : ''),
      }}
    />
  );
}

export default Select;
