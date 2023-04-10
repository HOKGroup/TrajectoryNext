import Section from './components/Section';
import SectionHeading from './components/SectionHeading';
import Table from './components/Table/Table';
import TableBody from './components/Table/TableBody';
import TableDataCell from './components/Table/TableDataCell';
import TableHead from './components/Table/TableHead';
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
              {placeholderServices.map((s) => (
                <TableHeaderCell key={s.id}>{s.name}</TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {existingUsers.map((user, _idx) => (
              <TableRow key={user.emailAddress}>
                <TableDataCell data-label="First">
                  {user.firstName}
                </TableDataCell>
                <TableDataCell data-label="Last">{user.lastName}</TableDataCell>
                <TableDataCell data-label="Email">
                  {user.emailAddress}
                </TableDataCell>
                <TableDataCell data-label="Discipline">
                  {user.discipline}
                </TableDataCell>
                <TableDataCell data-label="Role">{user.role}</TableDataCell>
                {placeholderServices.map((s) => (
                  <TableDataCell
                    key={s.id}
                    data-label={s.name}
                    className="break-normal"
                  >
                    {/* TODO: Service status */}
                  </TableDataCell>
                ))}
              </TableRow>
            ))}
            {!existingUsers.length && (
              <TableRow>
                <TableDataCell colSpan={5 + placeholderServices.length}>
                  No existing team members.
                </TableDataCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Section>
  );
};

export default ExistingTeam;
