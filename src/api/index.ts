import { projectOneContainer, projects } from './mockData';
import {
  ComponentType,
  DisciplineDetailsComponent,
  MemberOfComponent,
  PersonDetailsComponent,
  RoleDetailsComponent,
  ServiceDetailsComponent,
  ServiceGroupComponent,
} from './types';

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

export interface ProcessedPerson {
  person: PersonDetailsComponent;
  role?: RoleDetailsComponent | undefined;
  discipline?: DisciplineDetailsComponent | undefined;
  services?: ServiceDetailsComponent | undefined;
}

export interface ProcessedContainer {
  byType: {
    [ComponentType.PersonDetails]: PersonDetailsComponent[];
    [ComponentType.RoleDetails]: RoleDetailsComponent[];
    [ComponentType.DisciplineDetails]: DisciplineDetailsComponent[];
    [ComponentType.ServiceDetails]: ServiceDetailsComponent[];
    [ComponentType.ServiceGroup]: ServiceGroupComponent[];
  };

  relationships: {
    [ComponentType.MemberOf]: {
      personMemberOfProjectGroup: MemberOfComponent[];
      personMemberOfRole: MemberOfComponent[];
      personMemberOfDiscipline: MemberOfComponent[];
      personMemberOfServiceGroup: MemberOfComponent[];
    };
  };

  processedPeople: ProcessedPerson[];
}
