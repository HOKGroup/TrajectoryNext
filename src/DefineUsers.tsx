import { useCallback, useEffect, useState } from 'react';
import { ParsedUser } from './parseUserEmails';
import Button, { ButtonType } from './components/Button';
import Select from './components/Select';
import { type SingleValue } from 'react-select';
import TableRow from './components/Table/TableRow';
import Table from './components/Table/Table';
import TableHeaderCell from './components/Table/TableHeaderCell';
import TableDataCell from './components/Table/TableDataCell';
import Section from './components/Section';
import SectionHeading from './components/SectionHeading';
import TableBody from './components/Table/TableBody';
import TableHead from './components/Table/TableHead';

interface Props {
  enabled: boolean;
  parsedUsers: Array<ParsedUser>;
}

interface DefinedUser {
  firstName: string | null;
  lastName: string | null;
  emailAddress: string;
  discipline: Discipline | null;
  role: Role | null;
}

interface Discipline {
  id: string;
  name: string;
}

const placeholderDisciplines: Discipline[] = [
  { id: '1', name: 'Arch' },
  { id: '2', name: 'Structure' },
  { id: '3', name: 'Interior' },
];

interface Role {
  id: string;
  name: string;
}

const placeholderRoles = [
  { id: '1', name: 'HOK' },
  { id: '2', name: 'HOK Management' },
  { id: '3', name: 'Consultant' },
  { id: '4', name: 'Limited Consultant' },
  { id: '5', name: 'Contractor' },
  { id: '6', name: 'Sub-Contractor' },
  { id: '7', name: 'Owner' },
  { id: '8', name: 'Owner Contact Only' },
];

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

  const swapFirstAndLastName = useCallback((idx: number) => {
    setUsers((users) => {
      const newUsers = [...users];

      newUsers[idx] = {
        ...newUsers[idx],
        firstName: newUsers[idx].lastName,
        lastName: newUsers[idx].firstName,
      };

      return newUsers;
    });
  }, []);

  const handleCancel = useCallback(() => {
    setUsers([]);
  }, []);

  const handleChangeDiscipline =
    (idx: number) => (discipline: SingleValue<Discipline>) => {
      setUsers((users) => {
        const updatedUsers = [...users];

        updatedUsers[idx] = {
          ...updatedUsers[idx],
          discipline,
        };

        return updatedUsers;
      });
    };

  const handleChangeRole = (idx: number) => (role: SingleValue<Role>) => {
    setUsers((users) => {
      const updatedUsers = [...users];

      updatedUsers[idx] = {
        ...updatedUsers[idx],
        role,
      };

      return updatedUsers;
    });
  };

  const getRoleOptionValue = useCallback(
    (role: SingleValue<Role>) => role?.id ?? '',
    []
  );

  const getRoleOptionLabel = useCallback(
    (role: SingleValue<Role>) => role?.name ?? '',
    []
  );

  const getDisciplineOptionValue = useCallback(
    (discipline: SingleValue<Discipline>) => discipline?.id ?? '',
    []
  );

  const getDisciplineOptionLabel = useCallback(
    (discipline: SingleValue<Discipline>) => discipline?.name ?? '',
    []
  );

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
              <TableRow key={user.emailAddress}>
                <TableDataCell data-label="First" className="break-all">
                  {user.firstName}
                </TableDataCell>
                <TableDataCell className="text-right">
                  {user.firstName && user.lastName && (
                    <Button
                      buttonType={ButtonType.Secondary}
                      className="!p-1 !px-2 text-sm font-extrabold"
                      onClick={() => swapFirstAndLastName(idx)}
                    >
                      {'Swap First/Last'}
                    </Button>
                  )}
                </TableDataCell>
                <TableDataCell data-label="Last" className="break-all">
                  {user.lastName}
                </TableDataCell>
                <TableDataCell data-label="Email" className="break-all">
                  {user.emailAddress}
                </TableDataCell>
                <TableDataCell data-label="Discipline">
                  <Select
                    aria-label="Discipline"
                    menuPortalTarget={document.body}
                    options={placeholderDisciplines}
                    onChange={handleChangeDiscipline(idx)}
                    selectedValue={user.discipline}
                    getOptionValue={getDisciplineOptionValue}
                    getOptionLabel={getDisciplineOptionLabel}
                  />
                </TableDataCell>
                <TableDataCell data-label="Role">
                  <Select<Role>
                    aria-label="Role"
                    menuPortalTarget={document.body}
                    options={placeholderRoles}
                    onChange={handleChangeRole(idx)}
                    selectedValue={user.role}
                    getOptionValue={getRoleOptionValue}
                    getOptionLabel={getRoleOptionLabel}
                  />
                </TableDataCell>
              </TableRow>
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
