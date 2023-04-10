import { useCallback } from 'react';
import { type SingleValue } from 'react-select';
import Select from './components/Select';
import Section from './components/Section';
import SectionHeading from './components/SectionHeading';

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
    [setSelectedProject]
  );

  const noOptionsMessage = useCallback(() => 'No projects found.', []);

  return (
    <Section>
      <SectionHeading id="selectProject">Select Project</SectionHeading>
      <Select
        aria-labelledby="selectProject"
        onChange={onChange}
        options={placeholderProjects.map((p) => ({
          value: p.id,
          label: p.name,
        }))}
        selectedValue={
          selectedProject
            ? { value: selectedProject.id, label: selectedProject.name }
            : null
        }
        noOptionsMessage={noOptionsMessage}
      />
    </Section>
  );
};

export default SelectProject;
