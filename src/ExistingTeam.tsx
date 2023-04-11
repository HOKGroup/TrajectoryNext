import { useCallback, useEffect, useState } from 'react';
import {
  DisciplineDetailsComponent,
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
import { roles } from './api/mockData';
import { disciplines } from './api/mockData';
import ExistingTeamUserRow from './ExistingTeamUserRow';
import Button, { ButtonType } from './components/Button';

interface Service {
  id: string;
  name: string;
}

export interface ExistingUser {
  firstName: string;
  lastName: string;
  emailAddress: string;
  discipline: DisciplineDetailsComponent;
  role: RoleDetailsComponent;
  services: Service[];
}

interface Props {
  project: ProjectDetailsComponent | null;
  services: ServiceDetailsComponent[] | null;
}

const placeholderUsers = [
  {
    firstName: 'Michael',
    lastName: 'Davis',
    emailAddress: 'mdavis@example.com',
    discipline: disciplines[0], // Arch
    role: roles[0], // HOK
    services: [],
  },
  {
    firstName: 'Emily',
    lastName: 'Lee',
    emailAddress: 'elee@example.com',
    discipline: disciplines[1], // Structure,
    role: roles[2], // Consultant
    services: [],
  },
];

const ExistingTeam: React.FC<Props> = ({ project, services }) => {
  const [existingUsers, setExistingUsers] = useState([] as ExistingUser[]);
  const [stateExistingUsers, setStateExistingUsers] = useState(
    [] as ExistingUser[]
  );
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (project) {
      setExistingUsers(placeholderUsers);
    } else {
      setExistingUsers([]);
    }
  }, [project]);

  useEffect(() => {
    setStateExistingUsers(existingUsers);
  }, [existingUsers]);

  useEffect(() => {
    let isDirty = false;

    for (let i = 0; i < stateExistingUsers.length; i++) {
      if (
        stateExistingUsers[i].role.id !== existingUsers[i].role.id ||
        stateExistingUsers[i].discipline.id !== existingUsers[i].discipline.id
      ) {
        isDirty = true;
        setIsDirty(true);
        i = stateExistingUsers.length;
      }
    }

    if (!isDirty) {
      setIsDirty(false);
    }
  }, [existingUsers, stateExistingUsers]);

  const handleCancel = useCallback(() => {
    setStateExistingUsers(existingUsers);
    setIsDirty(false);
  }, [existingUsers]);

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
              {(services || []).map((s) => (
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
                    user={user}
                    services={services}
                    setUsers={setStateExistingUsers}
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
