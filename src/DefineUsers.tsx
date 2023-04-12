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
  clearParsedUsers: () => void;
}

export interface DefinedUser {
  firstName: string | null;
  lastName: string | null;
  emailAddress: string;
  discipline: DisciplineDetailsComponent | null;
  role: RoleDetailsComponent | null;
}

const DefineUsers: React.FC<Props> = ({
  enabled,
  parsedUsers,
  clearParsedUsers,
}) => {
  const [users, setUsers] = useState([] as DefinedUser[]);

  useEffect(() => {
    const stateUsers = parsedUsers.map((u) => ({
      ...u,
      discipline: null,
      role: null,
    }));

    setUsers(stateUsers);
  }, [parsedUsers]);

  const handleCancel = useCallback(() => {
    setUsers([]);
    clearParsedUsers();
  }, [clearParsedUsers]);

  const setUser = useCallback((idx: number, user: DefinedUser) => {
    setUsers((users) => {
      const updatedUsers = [...users];
      updatedUsers[idx] = user;

      return updatedUsers;
    });
  }, []);

  const removeUser = useCallback((idx: number) => {
    setUsers((users) => {
      const updatedUsers = [...users];
      updatedUsers.splice(idx, 1);

      return updatedUsers;
    });
  }, []);

  return (
    <Section>
      <SectionHeading>Define Users</SectionHeading>
      <div className="overflow-x-auto">
        <Table className="min-w-full table-fixed">
          <TableHead>
            <TableRow isHeader={true}>
              <TableHeaderCell />
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
                <TableDataCell colSpan={7}>No users defined.</TableDataCell>
              </TableRow>
            )}
            {users.map((user, idx) => (
              <DefineUsersUserRow
                key={idx}
                user={user}
                setUser={setUser}
                removeUser={removeUser}
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
