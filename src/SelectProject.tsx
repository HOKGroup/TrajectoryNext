import { useCallback } from 'react';
import { type SingleValue } from 'react-select';
import Select from './components/Select';
import Section from './components/Section';
import SectionHeading from './components/SectionHeading';
import { projects } from './api/mockData';
import { ProjectDetailsComponent } from './api/types';

interface Props {
  selectedProject: ProjectDetailsComponent | null;
  setSelectedProject: (project: ProjectDetailsComponent | null) => void;
}

const SelectProject: React.FC<Props> = ({
  selectedProject,
  setSelectedProject,
}) => {
  const onChange = useCallback(
    (selectedOption: SingleValue<ProjectDetailsComponent>) => {
      setSelectedProject(selectedOption);
    },
    [setSelectedProject]
  );

  const noOptionsMessage = useCallback(() => 'No projects found.', []);

  const getProjectOptionValue = useCallback(
    (project: SingleValue<ProjectDetailsComponent>) => project?.id ?? '',
    []
  );

  const getProjectOptionLabel = useCallback(
    (project: SingleValue<ProjectDetailsComponent>) =>
      [project?.payload.number || '', project?.payload.alias || '']
        .join(' ')
        .trim(),
    []
  );

  return (
    <Section>
      <SectionHeading id="selectProject">Select Project</SectionHeading>
      <Select
        aria-labelledby="selectProject"
        onChange={onChange}
        options={projects}
        value={selectedProject}
        noOptionsMessage={noOptionsMessage}
        getOptionValue={getProjectOptionValue}
        getOptionLabel={getProjectOptionLabel}
      />
    </Section>
  );
};

export default SelectProject;
