import { useCallback } from 'react';
import Select, { type SingleValue } from 'react-select';

interface Project {
  id: string;
  name: string;
}

const placeholderProjects: Project[] = [
  {
    id: '1',
    name: 'Project One',
  },
  {
    id: '2',
    name: 'Project Two',
  },
  {
    id: '3',
    name: 'Project Three',
  },
  {
    id: '4',
    name: 'Project Four',
  },
  {
    id: '5',
    name: 'Project Five',
  },
];

interface Props {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

const SelectProject: React.FC<Props> = ({
  selectedProject,
  setSelectedProject,
}) => {
  const onChange = useCallback(
    (selectedOption: SingleValue<{ value: string; label: string }>) => {
      if (selectedOption) {
        setSelectedProject({
          id: selectedOption.value,
          name: selectedOption.label,
        });
      } else {
        setSelectedProject(null);
      }
    },
    []
  );

  return (
    <div className="mb-6">
      <h2 className="mb-2 text-xl font-semibold">Select Project</h2>
      <Select
        unstyled={true}
        isClearable={true}
        onChange={onChange}
        options={placeholderProjects.map((p) => ({
          value: p.id,
          label: p.name,
        }))}
        classNames={{
          dropdownIndicator: (_state) => 'text-black/50 cursor-pointer',
          indicatorSeparator: (_state) => 'bg-black/20 mx-2',
          clearIndicator: (_state) => 'text-black/50 cursor-pointer',
          control: (state) =>
            'border-2 px-2 rounded-md focus:outline-none bg-white' +
            (state.isFocused
              ? ' ring ring-blue-300 outline-none border-0'
              : '') +
            (selectedProject ? ' text-black' : ' text-black/50'),
          menu: (_state) => 'mt-2 border-2 bg-white rounded-md drop-shadow-md',
          option: (state) =>
            'px-2 leading-10' +
            (state.isFocused ? ' bg-blue-200' : '') +
            (state.isSelected ? ' bg-blue-500 text-white' : ''),
        }}
      />
    </div>
  );
};

export default SelectProject;
