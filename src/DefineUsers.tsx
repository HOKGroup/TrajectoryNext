import { useCallback, useEffect, useState } from 'react';
import { ParsedUser } from './parseUserEmails';
import Button, { ButtonType } from './components/Button';
import TableRow from './components/Table/TableRow';
import Table from './components/Table/Table';
import TableHeaderCell from './components/Table/TableHeaderCell';
import TableDataCell from './components/Table/TableDataCell';
import Section from './components/Section';
import SectionHeading from './components/SectionHeading';
import TableBody from './components/Table/TableBody';
import TableHead from './components/Table/TableHead';
import { DisciplineDetailsComponent, RoleDetailsComponent } from './api/types';
import DefineUsersUserRow from './DefineUsersUserRow';

interface Props {
  enabled: boolean;
  parsedUsers: Array<ParsedUser>;
}

export interface DefinedUser {
  firstName: string | null;
  lastName: string | null;
  emailAddress: string;
  discipline: DisciplineDetailsComponent | null;
  role: RoleDetailsComponent | null;
}

const DefineUsers: React.FC<Props> = ({ enabled, parsedUsers }) => {
  const [users, setUsers] = useState([] as DefinedUser[]);

  useEffect(() => {
    setUsers((users) => {
      const existingDefinedUsersMap = users.reduce((acc, u) => {
        acc.set(u.emailAddress, u);
        return acc;
      }, new Map<string, DefinedUser>());

      const definedUsers = parsedUsers.map((u) => {
        const existingDefinedUser = existingDefinedUsersMap.get(u.emailAddress);

        return {
          ...u,
          discipline: existingDefinedUser?.discipline ?? null,
          role: existingDefinedUser?.role ?? null,
        };
      });

      return definedUsers;
    });
  }, [parsedUsers]);

  const handleCancel = useCallback(() => {
    setUsers([]);
  }, []);

  return (
    <Section>
      <SectionHeading>Define Users</SectionHeading>
      <div className="overflow-x-auto">
        <Table className="min-w-full table-fixed">
          <TableHead>
            <TableRow isHeader={true}>
              <TableHeaderCell className="min-w-fit">First</TableHeaderCell>
              <TableHeaderCell className="w-[8rem]" />
              <TableHeaderCell className="min-w-fit">Last</TableHeaderCell>
              <TableHeaderCell className="min-w-fit">Email</TableHeaderCell>
              <TableHeaderCell className="min-w-[10rem]">
                Discipline
              </TableHeaderCell>
              <TableHeaderCell className="min-w-[15rem]">Role</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!users.length && (
              <TableRow>
                <TableDataCell colSpan={6}>No users defined.</TableDataCell>
              </TableRow>
            )}
            {users.map((user, idx) => (
              <DefineUsersUserRow
                key={idx}
                user={user}
                setUsers={setUsers}
                idx={idx}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <span className="flex justify-between gap-4 md:justify-start">
        <Button
          buttonType={ButtonType.Primary}
          type="submit"
          disabled={!enabled || !users.length} // TODO: check whether all fields are complete for each user
          className="order-last grow md:order-1 md:grow-0"
        >
          Submit
        </Button>
        <Button
          buttonType={ButtonType.Warning}
          type="reset"
          disabled={!enabled || !users.length}
          onClick={handleCancel}
          className="order-first grow md:order-2 md:grow-0"
        >
          Cancel
        </Button>
      </span>
    </Section>
  );
};

export default DefineUsers;
