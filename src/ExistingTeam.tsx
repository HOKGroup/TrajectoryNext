import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (project) {
      setExistingUsers(placeholderUsers);
    } else {
      setExistingUsers([]);
    }
  }, [project]);

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
                {existingUsers.map((user, idx) => (
                  <ExistingTeamUserRow
                    key={idx}
                    idx={idx}
                    user={user}
                    services={services}
                    setUsers={setExistingUsers}
                  />
                ))}
                {!existingUsers.length && (
                  <TableRow>
                    <TableDataCell colSpan={5 + services.length}>
                      No existing team members.
                    </TableDataCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </Section>
  );
};

export default ExistingTeam;
