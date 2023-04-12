import {
  ComponentType,
  ProjectDetailsComponent,
  RoleDetailsComponent,
  DisciplineDetailsComponent,
  ServiceDetailsComponent,
  PersonDetailsComponent,
  ServiceGroupComponent,
  MemberOfComponent,
} from './types';

export const projects: ProjectDetailsComponent[] = [
  {
    id: 'b8c000bf-f80f-4ea4-b23d-13b34949b05d',
    entityId: 'b13f5d3d-6191-4428-8be0-987962771a9c',
    type: ComponentType.ProjectDetails,
    payload: {
      name: 'Project One',
      alias: 'proj one',
      number: '1.1.1.1',
    },
  },
  {
    id: 'ae7f0dfe-6eb9-45be-97cf-dc0521beec89',
    entityId: '2567898d-1972-4b8d-86d1-3ec6cb4ad2c1',
    type: ComponentType.ProjectDetails,
    payload: {
      name: 'Project Two',
      alias: 'proj two',
      number: '2.2.2.2',
    },
  },
  {
    id: '2b86ce2d-9861-43dd-bc28-67a0ec9d7268',
    entityId: '24d1004f-8513-4b71-a51d-2b5434e6d949',
    type: ComponentType.ProjectDetails,
    payload: {
      name: 'Project Three',
      alias: 'proj three',
      number: '3.3.3.3',
    },
  },
  {
    id: 'b748b2ba-883d-4b9e-be02-d17d7caa7c97',
    entityId: '6ef1f031-37e5-40dc-853f-ac055be39070',
    type: ComponentType.ProjectDetails,
    payload: {
      name: 'Project Four',
      alias: 'proj four',
      number: '4.4.4.4',
    },
  },
  {
    id: 'db20fd83-b943-4535-86a5-3a8804876ee8',
    entityId: '9db85639-cfd3-46cb-9970-78a9c1f9d12d',
    type: ComponentType.ProjectDetails,
    payload: {
      name: 'Project Five',
      alias: 'proj five',
      number: '5.5.5.5',
    },
  },
];

export const roles: RoleDetailsComponent[] = [
  {
    id: 'b1a95c4a-1fbd-45f1-aa55-4f2e057f388b',
    entityId: '3624d10d-229c-4fdc-8b6a-d73227e20235',
    type: ComponentType.RoleDetails,
    payload: {
      name: 'HOK',
    },
  },
  {
    id: 'fd4d3e2f-63f8-4352-bc01-da90a2735828',
    entityId: 'ace1a951-3291-4f02-86f6-e7d6a5d74821',
    type: ComponentType.RoleDetails,
    payload: {
      name: 'HOK Management',
    },
  },
  {
    id: '2f957d5f-3080-47ee-80ff-d2c7d499f50c',
    entityId: 'c97d5272-deff-448f-9aac-efba996fe60b',
    type: ComponentType.RoleDetails,
    payload: {
      name: 'Consultant',
    },
  },
  {
    id: 'b53cd835-fe69-4356-94c8-f45a889106d8',
    entityId: '5ab4ff7c-8337-47d8-8704-4ebb2e95c68a',
    type: ComponentType.RoleDetails,
    payload: {
      name: 'Limited Consultant',
    },
  },
  {
    id: 'affc3d73-03bf-4a9e-a43c-896ae1fba20c',
    entityId: '5616f358-923e-4970-ae1b-c0b2d4502626',
    type: ComponentType.RoleDetails,
    payload: {
      name: 'Contractor',
    },
  },
  {
    id: 'e836636f-35b8-4a31-bb98-0ade33d1ec93',
    entityId: '8588a326-7a13-4eda-8ec3-0c93298c07ae',
    type: ComponentType.RoleDetails,
    payload: {
      name: 'Sub-Contractor',
    },
  },
  {
    id: '0dd120c4-de3f-4341-b08b-3a1ab1ddd077',
    entityId: '5ad9f527-c1bd-4177-8c12-d537e8aaf679',
    type: ComponentType.RoleDetails,
    payload: {
      name: 'Owner',
    },
  },
  {
    id: '181ab49f-19e6-45f8-a676-3362ee8b15ec',
    entityId: '65a5d831-2820-4f2a-9e73-73909fa6d7ca',
    type: ComponentType.RoleDetails,
    payload: {
      name: 'Owner Contact Only',
    },
  },
];

export const disciplines: DisciplineDetailsComponent[] = [
  {
    id: 'c48aa728-d3b0-4ec5-8c7a-b4ee2ed30539',
    entityId: '430f7098-fc78-48bf-bf9c-47b6c265796e',
    type: ComponentType.DisciplineDetails,
    payload: {
      name: 'Arch',
    },
  },
  {
    id: 'ff478032-aa49-4657-99bb-7a98f236bf5d',
    entityId: 'f941e25e-914f-414a-84a1-784e6f31ba23',
    type: ComponentType.DisciplineDetails,
    payload: {
      name: 'Structure',
    },
  },
  {
    id: '54b91471-6fcb-46d7-b25f-7c6cf81e49d4',
    entityId: 'b4606654-9e0e-4b5d-9a64-2ccc1aff6243',
    type: ComponentType.DisciplineDetails,
    payload: {
      name: 'Interior',
    },
  },
];

export const serviceDetails: ServiceDetailsComponent[] = [
  {
    id: 'ceadf107-bafe-4669-9b2f-3143a9b35486',
    entityId: '69863406-5c6d-4190-9cd0-d829d996f925',
    type: ComponentType.ServiceDetails,
    payload: {
      name: 'Trimble Connect',
    },
  },
  {
    id: '261e246c-59af-43d0-b0ab-c159bf66e9f2',
    entityId: '85b63c1a-91ae-42a3-86df-2088458bcdf8',
    type: ComponentType.ServiceDetails,
    payload: {
      name: 'Smartsheet',
    },
  },
];

export const serviceGroups: ServiceGroupComponent[] = [
  {
    id: 'a99402d8-06fc-48d2-bd2f-caaed07249f0',
    entityId: serviceDetails[0].entityId, // Trimble Connect
    type: ComponentType.ServiceGroup,
    payload: {
      name: 'Trimble Connect Group One',
    },
  },
  {
    id: '850391e4-7b1a-48a5-aa68-873ecf9cf58b',
    entityId: serviceDetails[0].entityId, // Trimble Connect
    type: ComponentType.ServiceGroup,
    payload: {
      name: 'Trimble Connect Group Two',
    },
  },
  {
    id: 'a39128fe-7506-43bd-b184-ed07f1f42c91',
    entityId: serviceDetails[1].entityId, // Smartsheet
    type: ComponentType.ServiceGroup,
    payload: {
      name: 'Smartsheet Group One',
    },
  },
  {
    id: 'c9bc3960-4a60-46f0-a1bb-66e6f1b4de86',
    entityId: serviceDetails[1].entityId, // Smartsheet
    type: ComponentType.ServiceGroup,
    payload: {
      name: 'Smartsheet Group Two',
    },
  },
];

export const people: PersonDetailsComponent[] = [
  {
    id: 'c39b815d-ac01-4371-bc5a-7c1de9aadf4f',
    entityId: '7dbbe37d-e7fe-46ef-9e78-da68f199194b',
    type: ComponentType.PersonDetails,
    payload: {
      firstName: 'Michael',
      lastName: 'Davis',
      emailAddress: 'mdavis@example.com',
    },
  },
  {
    id: '5cff46b3-8340-4092-aee8-0042e8599e48',
    entityId: '1a5aa83f-e685-4a2f-ac08-0346c376e2a4',
    type: ComponentType.PersonDetails,
    payload: {
      firstName: 'Emily',
      lastName: 'Lee',
      emailAddress: 'elee@example.com',
    },
  },
];

export const serviceMemberships: MemberOfComponent[] = [
  {
    id: '4ac11044-eb46-4a82-b0f6-b552f44b9307',
    entityId: 'fab75a33-7a5f-4855-87f1-8d52950c4216',
    type: ComponentType.MemberOf,
    payload: {
      fromComponentId: people[0].id,
      fromEntityId: people[0].entityId,
      fromComponentType: ComponentType.PersonDetails,
      toComponentId: serviceGroups[0].id,
      toEntityId: serviceGroups[0].entityId,
      toComponentType: ComponentType.ServiceGroup,
    },
  },
  {
    id: 'e28e6b3d-9556-45d6-a8a0-0e1ce376b714',
    entityId: '54520a8a-a8ee-4f0c-8505-cda4a30aae99',
    type: ComponentType.MemberOf,
    payload: {
      fromComponentId: people[1].id,
      fromEntityId: people[1].entityId,
      fromComponentType: ComponentType.PersonDetails,
      toComponentId: serviceGroups[2].id,
      toEntityId: serviceGroups[2].entityId,
      toComponentType: ComponentType.ServiceGroup,
    },
  },
];

export const roleMemberships: MemberOfComponent[] = [
  {
    id: '642c28c1-0032-4bee-b88f-2966b54a529c',
    entityId: 'a0ac9d4c-1b38-4bee-bcc7-2154476f4a22',
    type: ComponentType.MemberOf,
    payload: {
      fromComponentId: people[0].id,
      fromEntityId: people[0].entityId,
      fromComponentType: ComponentType.PersonDetails,
      toComponentId: roles[0].id, // HOK
      toEntityId: roles[0].entityId,
      toComponentType: ComponentType.RoleDetails,
    },
  },
  {
    id: '2f6fb6d6-1cf9-4d6c-9945-029bdd699dfa',
    entityId: '1a52e4e6-44cc-4f9f-b72e-019076e531c6',
    type: ComponentType.MemberOf,
    payload: {
      fromComponentId: people[1].id,
      fromEntityId: people[1].entityId,
      fromComponentType: ComponentType.PersonDetails,
      toComponentId: roles[2].id, // Consultant
      toEntityId: roles[2].entityId,
      toComponentType: ComponentType.RoleDetails,
    },
  },
];

export const disciplineMemberships: MemberOfComponent[] = [
  {
    id: '3e4364e2-adfc-4669-aa47-d7e594db1165',
    entityId: 'cd5e7543-c266-4e3c-954f-4e59afaccb45',
    type: ComponentType.MemberOf,
    payload: {
      fromComponentId: people[0].id,
      fromEntityId: people[0].entityId,
      fromComponentType: ComponentType.PersonDetails,
      toComponentId: disciplines[0].id, // Arch
      toEntityId: disciplines[0].entityId,
      toComponentType: ComponentType.DisciplineDetails,
    },
  },
  {
    id: 'ff109932-6a1f-4e76-9950-29754065d5ad',
    entityId: '6acc8de8-89f3-4f19-9c8b-5757c48103af',
    type: ComponentType.MemberOf,
    payload: {
      fromComponentId: people[1].id,
      fromEntityId: people[1].entityId,
      fromComponentType: ComponentType.PersonDetails,
      toComponentId: disciplines[1].id, // Structure
      toEntityId: disciplines[1].entityId,
      toComponentType: ComponentType.DisciplineDetails,
    },
  },
];

export const projectOneContainer = [
  projects[0],
  ...people,
  ...serviceDetails,
  ...serviceGroups,
  ...serviceMemberships,
  ...roles,
  ...roleMemberships,
  ...disciplines,
  ...disciplineMemberships,
];
