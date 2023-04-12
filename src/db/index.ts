import { openDB, DBSchema } from 'idb';
import {
  Container,
  CompanyDetailsComponent,
  ComponentType,
  DisciplineDetailsComponent,
  MemberOfComponent,
  PersonDetailsComponent,
  ProjectDetailsComponent,
  RoleDetailsComponent,
  ServiceDetailsComponent,
  ServiceGroupComponent,
} from '../api/types';

interface ComponentDB extends DBSchema {
  [ComponentType.CompanyDetails]: {
    key: string;
    value: CompanyDetailsComponent;
    indexes: {
      byEntityId: string;
    };
  };
  [ComponentType.DisciplineDetails]: {
    key: string;
    value: DisciplineDetailsComponent;
    indexes: {
      byEntityId: string;
    };
  };
  [ComponentType.PersonDetails]: {
    key: string;
    value: PersonDetailsComponent;
    indexes: {
      byEntityId: string;
    };
  };
  [ComponentType.ProjectDetails]: {
    key: string;
    value: ProjectDetailsComponent;
    indexes: {
      byEntityId: string;
    };
  };
  [ComponentType.RoleDetails]: {
    key: string;
    value: RoleDetailsComponent;
    indexes: {
      byEntityId: string;
    };
  };
  [ComponentType.ServiceDetails]: {
    key: string;
    value: ServiceDetailsComponent;
    indexes: {
      byEntityId: string;
    };
  };
  [ComponentType.ServiceGroup]: {
    key: string;
    value: ServiceGroupComponent;
    indexes: {
      byEntityId: string;
    };
  };
  [ComponentType.MemberOf]: {
    key: string;
    value: MemberOfComponent;
    indexes: {
      byEntityId: string;
      byFromComponentId: string;
      byFromEntityId: string;
      byFromComponentType: ComponentType;
      byToComponentId: string;
      byToEntityId: string;
      byToComponentType: ComponentType;
      byFromComponentIdAndTypes: [string, ComponentType, ComponentType];
    };
  };
}

export const open = async (projectEntityId: string) => {
  return openDB<ComponentDB>(projectEntityId, 1, {
    upgrade(db) {
      const companyDetailsStore = db.createObjectStore(
        ComponentType.CompanyDetails,
        { keyPath: 'id' }
      );
      companyDetailsStore.createIndex('byEntityId', 'entityId');

      const disciplineDetailsStore = db.createObjectStore(
        ComponentType.DisciplineDetails,
        { keyPath: 'id' }
      );
      disciplineDetailsStore.createIndex('byEntityId', 'entityId');

      const personDetailsStore = db.createObjectStore(
        ComponentType.PersonDetails,
        { keyPath: 'id' }
      );
      personDetailsStore.createIndex('byEntityId', 'entityId');

      const projectDetailsStore = db.createObjectStore(
        ComponentType.ProjectDetails,
        { keyPath: 'id' }
      );
      projectDetailsStore.createIndex('byEntityId', 'entityId');

      const roleDetailStore = db.createObjectStore(ComponentType.RoleDetails, {
        keyPath: 'id',
      });
      roleDetailStore.createIndex('byEntityId', 'entityId');

      const serviceDetailsStore = db.createObjectStore(
        ComponentType.ServiceDetails,
        { keyPath: 'id' }
      );
      serviceDetailsStore.createIndex('byEntityId', 'entityId');

      const serviceGroupStore = db.createObjectStore(
        ComponentType.ServiceGroup,
        { keyPath: 'id' }
      );
      serviceGroupStore.createIndex('byEntityId', 'entityId');

      const memberOfStore = db.createObjectStore(ComponentType.MemberOf, {
        keyPath: 'id',
      });
      memberOfStore.createIndex('byEntityId', 'entityId');
      memberOfStore.createIndex('byFromComponentId', 'payload.fromComponentId');
      memberOfStore.createIndex('byFromEntityId', 'payload.fromEntityId');
      memberOfStore.createIndex(
        'byFromComponentType',
        'payload.fromComponentType'
      );
      memberOfStore.createIndex('byToComponentId', 'payload.toComponentId');
      memberOfStore.createIndex('byToEntityId', 'payload.toEntityId');
      memberOfStore.createIndex(
        'byToComponentType',
        'payload.byToComponentType'
      );
      memberOfStore.createIndex('byFromComponentIdAndTypes', [
        'payload.fromComponentId',
        'payload.fromComponentType',
        'payload.toComponentType',
      ]);
    },
  });
};

export const getPeople = async (projectEntityId: string) => {
  const db = await open(projectEntityId);

  const people = await db.getAll(ComponentType.PersonDetails);

  return Promise.all(
    people.map(async (p) => {
      const roleDetails = await getRoleDetailsForPerson(projectEntityId, p.id);

      const disciplineDetails = await getDisciplineDetailsForPerson(
        projectEntityId,
        p.id
      );

      const serviceMemberships = await getServiceMembershipsForPerson(
        projectEntityId,
        p.id
      );

      const services = new Set<string>();

      serviceMemberships.forEach((sm) => {
        services.add(sm.payload.toEntityId);
      });

      return {
        personDetails: p,
        roleDetails,
        disciplineDetails,
        services,
      };
    })
  );
};

export const getRoles = async (projectEntityId: string) => {
  const db = await open(projectEntityId);

  return db.getAll(ComponentType.RoleDetails);
};

export const getDisciplines = async (projectEntityId: string) => {
  const db = await open(projectEntityId);

  return db.getAll(ComponentType.DisciplineDetails);
};

export const getServices = async (projectEntityId: string) => {
  const db = await open(projectEntityId);

  return db.getAll(ComponentType.ServiceDetails);
};

export const getServicesForPerson = async (
  projectEntityId: string,
  personComponentId: string
) => {
  const db = await open(projectEntityId);

  const serviceGroupMemberships = await db.getAllFromIndex(
    ComponentType.MemberOf,
    'byFromComponentIdAndTypes',
    [personComponentId, ComponentType.PersonDetails, ComponentType.ServiceGroup]
  );

  return Promise.all(
    serviceGroupMemberships.map((serviceGroupMembership) => {
      return db.getFromIndex(
        ComponentType.ServiceDetails,
        'byEntityId',
        serviceGroupMembership.payload.toEntityId
      );
    })
  );
};

export const getRoleDetailsForPerson = async (
  projectEntityId: string,
  personComponentId: string
) => {
  const db = await open(projectEntityId);

  const roleMembership = await db.getFromIndex(
    ComponentType.MemberOf,
    'byFromComponentIdAndTypes',
    [personComponentId, ComponentType.PersonDetails, ComponentType.RoleDetails]
  );

  if (!roleMembership) {
    return undefined;
  }

  return db.get(
    ComponentType.RoleDetails,
    roleMembership.payload.toComponentId
  );
};

export const getDisciplineDetailsForPerson = async (
  projectEntityId: string,
  personComponentId: string
) => {
  const db = await open(projectEntityId);

  const disciplineMembership = await db.getFromIndex(
    ComponentType.MemberOf,
    'byFromComponentIdAndTypes',
    [
      personComponentId,
      ComponentType.PersonDetails,
      ComponentType.DisciplineDetails,
    ]
  );

  if (!disciplineMembership) {
    return undefined;
  }

  return db.get(
    ComponentType.DisciplineDetails,
    disciplineMembership.payload.toComponentId
  );
};

export const getServiceMembershipsForPerson = async (
  projectEntityId: string,
  personComponentId: string
) => {
  const db = await open(projectEntityId);

  const serviceMemberships = await db.getAllFromIndex(
    ComponentType.MemberOf,
    'byFromComponentIdAndTypes',
    [personComponentId, ComponentType.PersonDetails, ComponentType.ServiceGroup]
  );

  return serviceMemberships;
};

export const insertAllFromContainer = async (
  projectEntityId: string,
  container: Container
) => {
  const db = await open(projectEntityId);

  const transaction = db.transaction(Object.values(ComponentType), 'readwrite');

  return Promise.all([
    ...container.map((component) => {
      return transaction.objectStore(component.type).put(component);
    }),
    transaction.done,
  ]);
};
