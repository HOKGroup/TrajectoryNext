export enum ComponentType {
  ProjectDetails = 'project.details',
  PersonDetails = 'person.details',
  CompanyDetails = 'company.details',
  ServiceDetails = 'service.details',
  ProjectGroup = 'project.group',
  RoleDetails = 'role.details',
  DisciplineDetails = 'discipline.details',
}

// all component types except ProjectDetails
export type ContainerComponent =
  | PersonDetailsComponent
  | CompanyDetailsComponent
  | ServiceDetailsComponent
  | ProjectGroupComponent
  | RoleDetailsComponent
  | DisciplineDetailsComponent;

export interface IComponent<T extends ComponentType, P> {
  id: string;
  entityId: string;
  type: T;
  payload: P;
}

export type ProjectDetailsComponent = IComponent<
  ComponentType.ProjectDetails,
  ProjectDetailsPayload
>;

export interface ProjectDetailsPayload {
  name: string;
  alias: string;
  number: string;
}

export type PersonDetailsComponent = IComponent<
  ComponentType.PersonDetails,
  PersonDetailsPayload
>;

export interface PersonDetailsPayload {
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export type CompanyDetailsComponent = IComponent<
  ComponentType.CompanyDetails,
  CompanyDetailsPayload
>;

export interface CompanyDetailsPayload {
  name: string;
  shortName?: string | undefined;
}

export type ServiceDetailsComponent = IComponent<
  ComponentType.ServiceDetails,
  ServiceDetailsPayload
>;

export interface ServiceDetailsPayload {
  name: string;
}

export type ProjectGroupComponent = IComponent<
  ComponentType.ProjectGroup,
  ProjectGroupPayload
>;

export interface ProjectGroupPayload {
  name: string;
}

export type RoleDetailsComponent = IComponent<
  ComponentType.RoleDetails,
  RoleDetailsPayload
>;

export interface RoleDetailsPayload {
  name: string;
}

export type DisciplineDetailsComponent = IComponent<
  ComponentType.DisciplineDetails,
  DisciplineDetailsPayload
>;

export interface DisciplineDetailsPayload {
  name: string;
}
