import { projectOneContainer, projects } from './mockData';

export const getProjects = () => {
  return projects;
};

export const getProjectContainer = (projectEntityId: string) => {
  if (projectEntityId === projects[0].entityId) {
    return projectOneContainer;
  }

  const projectDetails = projects.filter((p) => p.entityId === projectEntityId);

  if (projectDetails.length !== 1) {
    throw new Error('Error getting project details');
  }

  return [projectDetails[0]];
};
