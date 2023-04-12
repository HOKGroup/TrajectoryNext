import { openDB, DBSchema, IDBPDatabase } from 'idb';
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

export type DB = IDBPDatabase<ComponentDB>;

export interface ComponentDB extends DBSchema {
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

export const getPeople = async (db: DB) => {
  const people = await db.getAll(ComponentType.PersonDetails);

  return Promise.all(
    people.map(async (p) => {
      const roleDetails = await getRoleDetailsForPerson(db, p.id);

      const disciplineDetails = await getDisciplineDetailsForPerson(db, p.id);

      const serviceMemberships = await getServiceMembershipsForPerson(db, p.id);

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

export const getRoles = async (db: DB) => {
  return db.getAll(ComponentType.RoleDetails);
};

export const getDisciplines = async (db: DB) => {
  return db.getAll(ComponentType.DisciplineDetails);
};

export const getServices = async (db: DB) => {
  return db.getAll(ComponentType.ServiceDetails);
};

export const getServicesForPerson = async (
  db: DB,
  personComponentId: string
) => {
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
  db: DB,
  personComponentId: string
) => {
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
  db: DB,
  personComponentId: string
) => {
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
  db: DB,
  personComponentId: string
) => {
  const serviceMemberships = await db.getAllFromIndex(
    ComponentType.MemberOf,
    'byFromComponentIdAndTypes',
    [personComponentId, ComponentType.PersonDetails, ComponentType.ServiceGroup]
  );

  return serviceMemberships;
};

export const insertAllFromContainer = async (db: DB, container: Container) => {
  const transaction = db.transaction(Object.values(ComponentType), 'readwrite');

  return Promise.all([
    ...container.map((component) => {
      return transaction.objectStore(component.type).put(component);
    }),
    transaction.done,
  ]);
};
