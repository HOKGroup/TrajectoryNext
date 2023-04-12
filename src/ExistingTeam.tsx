import { useCallback, useEffect, useState } from 'react';
import {
  DisciplineDetailsComponent,
  PersonDetailsComponent,
  ProjectDetailsComponent,
  RoleDetailsComponent,
  ServiceDetailsComponent,
} from './api/types';
import Section from './components/Section';
import SectionHeading from './components/SectionHeading';
import Table from './components/Table/Table';
import TableBody from './components/Table/TableBody';
import TableDataCell from './components/Table/TableDataCell';
import TableHead from './components/Table/TableHead';
import TableHeaderCell from './components/Table/TableHeaderCell';
import TableRow from './components/Table/TableRow';
import ExistingTeamUserRow from './ExistingTeamUserRow';
import Button, { ButtonType } from './components/Button';
import { DB, getPeople, getServices } from './db';

export interface Person {
  personDetails: PersonDetailsComponent;
  roleDetails: RoleDetailsComponent | undefined;
  disciplineDetails: DisciplineDetailsComponent | undefined;

  // set of service entity ids
  services: Set<string>;
}

interface Props {
  project: ProjectDetailsComponent | null;
  containerIsAddedToDb: boolean;
  db: DB | undefined;
}

export interface UserChanges {
  discipline?: DisciplineDetailsComponent;
  role?: RoleDetailsComponent;
  firstName?: string;
  lastName?: string;

  // set of service entity ids that have been toggled
  services?: Set<string>;
}

// map from array index to user changes
export type UsersChanges = Record<number, UserChanges>;

const ExistingTeam: React.FC<Props> = ({
  project,
  containerIsAddedToDb,
  db,
}) => {
  const [existingUsers, setExistingUsers] = useState([] as Person[]);

  const [services, setServices] = useState([] as ServiceDetailsComponent[]);

  const [usersChanges, setUsersChanges] = useState({} as UsersChanges);

  const [stateExistingUsers, setStateExistingUsers] = useState([] as Person[]);

  useEffect(() => {
    if (!project || !containerIsAddedToDb || !db) {
      setExistingUsers([]);
      return;
    }

    let ignore = false;

    Promise.all([getPeople(db), getServices(db)])
      .then(([people, services]) => {
        if (!ignore) {
          setExistingUsers(people);
          setServices(services);
        }
      })
      .catch(() => {
        if (!ignore) {
          setExistingUsers([]);
        }
      });

    return () => {
      ignore = true;
    };
  }, [project, containerIsAddedToDb, db]);

  useEffect(() => {
    setStateExistingUsers(existingUsers);
  }, [existingUsers]);

  const handleCancel = useCallback(() => {
    setStateExistingUsers(existingUsers);
    setUsersChanges({} as UsersChanges);
  }, [existingUsers]);

  const setUserChanges = useCallback(
    (idx: number, userChanges: UserChanges | undefined) => {
      const existingUserChanges = usersChanges[idx];

      setUsersChanges((existingUsersChanges) => {
        if (userChanges) {
          return {
            ...existingUsersChanges,
            [idx]: {
              ...existingUserChanges,
              ...userChanges,
            },
          };
        } else {
          const newUsersChanges = { ...existingUsersChanges };
          delete newUsersChanges[idx];

          return newUsersChanges;
        }
      });
    },
    [usersChanges]
  );

  const isDirty = Object.keys(usersChanges).length > 0;

  return (
    <Section>
      <SectionHeading>Existing Team</SectionHeading>
      <div className="overflow-x-auto">
        <Table className="min-w-full table-fixed">
          <TableHead>
            <TableRow isHeader={true}>
              <TableHeaderCell>First</TableHeaderCell>
              <TableHeaderCell>Last</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Discipline</TableHeaderCell>
              <TableHeaderCell>Role</TableHeaderCell>
              {services.map((s) => (
                <TableHeaderCell key={s.id}>{s.payload.name}</TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {project && services && (
              <>
                {stateExistingUsers.map((user, idx) => (
                  <ExistingTeamUserRow
                    key={idx}
                    idx={idx}
                    person={user}
                    services={services}
                    userChanges={usersChanges[idx]}
                    setUserChanges={setUserChanges}
                  />
                ))}
                {!stateExistingUsers.length && (
                  <TableRow>
                    <TableDataCell colSpan={5 + services.length}>
                      No existing team members.
                    </TableDataCell>
                  </TableRow>
                )}
              </>
            )}
            {!project && (
              <TableRow>
                <TableDataCell colSpan={5 + (services || []).length}>
                  No project selected.
                </TableDataCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <span className="flex justify-between gap-4 md:justify-start">
        <Button
          buttonType={ButtonType.Primary}
          type="submit"
          disabled={!project || !existingUsers.length || !isDirty} // TODO: check whether all fields are complete for each user
          className="order-last grow md:order-1 md:grow-0"
        >
          Submit
        </Button>
        <Button
          buttonType={ButtonType.Warning}
          type="reset"
          disabled={!project || !stateExistingUsers.length || !isDirty}
          onClick={handleCancel}
          className="order-first grow md:order-2 md:grow-0"
        >
          Cancel
        </Button>
      </span>
    </Section>
  );
};

export default ExistingTeam;
