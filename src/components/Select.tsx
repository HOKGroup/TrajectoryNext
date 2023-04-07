import ReactSelect, { type SingleValue } from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  onChange: (newValue: SingleValue<Option>) => void;
  selectedValue: Option | null;
  menuPortalTarget?: HTMLElement | null | undefined;
}

const Select: React.FC<Props> = ({
  options,
  onChange,
  selectedValue,
  menuPortalTarget,
}) => {
  return (
    <ReactSelect
      unstyled={true}
      isClearable={true}
      onChange={onChange}
      options={options}
      menuPortalTarget={menuPortalTarget}
      classNames={{
        dropdownIndicator: (_state) => 'text-black/50 cursor-pointer',
        indicatorSeparator: (_state) => 'bg-black/20 mx-2',
        clearIndicator: (_state) => 'text-black/50 cursor-pointer',
        control: (state) =>
          'border-2 px-2 rounded-md focus:outline-none bg-white' +
          (state.isFocused
            ? ' ring ring-blue-300 outline-none border-transparent'
            : '') +
          (selectedValue ? ' text-black' : ' text-black/50'),
        menu: (_state) => 'mt-2 border-2 bg-white rounded-md drop-shadow-md',
        option: (state) =>
          'px-2 leading-8' +
          (state.isFocused ? ' bg-blue-200' : '') +
          (state.isSelected ? ' bg-blue-500 text-white' : ''),
      }}
    />
  );
};

export default Select;
