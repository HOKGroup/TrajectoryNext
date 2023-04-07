import Section from './components/Section';
import Table from './components/Table/Table';
import TableDataCell from './components/Table/TableDataCell';
import TableHeaderCell from './components/Table/TableHeaderCell';
import TableRow from './components/Table/TableRow';

interface Service {
  id: string;
  name: string;
}

interface ExistingUser {
  firstName: string;
  lastName: string;
  emailAddress: string;
  discipline: string;
  role: string;
  services: Service[];
}

interface Props {
  existingUsers: ExistingUser[];
}

const placeholderServices = [
  {
    id: 1,
    name: 'Trimble Connect',
  },
  {
    id: 2,
    name: 'Smartsheet',
  },
];

const ExistingTeam: React.FC<Props> = ({ existingUsers }) => {
  return (
    <Section title="Existing Team">
      <div className="overflow-x-auto">
        <Table className="min-w-full table-fixed">
          <thead>
            <TableRow isHeader={true}>
              <TableHeaderCell className="min-w-[8rem]">First</TableHeaderCell>
              <TableHeaderCell className="min-w-[8rem]">Last</TableHeaderCell>
              <TableHeaderCell className="min-w-[10rem]">Email</TableHeaderCell>
              <TableHeaderCell className="min-w-[10rem]">
                Discipline
              </TableHeaderCell>
              <TableHeaderCell className="min-w-[12rem]">Role</TableHeaderCell>
              {placeholderServices.map((s) => (
                <TableHeaderCell key={s.id} className="min-w-[10rem]">
                  {s.name}
                </TableHeaderCell>
              ))}
            </TableRow>
          </thead>
          <tbody>
            {existingUsers.map((user, _idx) => (
              <TableRow key={user.emailAddress}>
                <TableDataCell>{user.firstName}</TableDataCell>
                <TableDataCell>{user.lastName}</TableDataCell>
                <TableDataCell>{user.emailAddress}</TableDataCell>
                <TableDataCell>{user.discipline}</TableDataCell>
                <TableDataCell>{user.role}</TableDataCell>
                {placeholderServices.map((s) => (
                  <TableDataCell key={s.id}>
                    {/* TODO: Service status */}
                  </TableDataCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
    </Section>
  );
};

export default ExistingTeam;
