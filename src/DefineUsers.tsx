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

interface Props {
  enabled: boolean;
  parsedUsers: Array<ParsedUser>;
}

interface DefinedUser {
  firstName: string | null;
  lastName: string | null;
  emailAddress: string;
  discipline: string | null;
  role: string | null;
}

const placeholderDisciplines = ['Arch', 'Structure', 'Interior'];

const placeholderRoles = [
  'HOK',
  'HOK Management',
  'Consultant',
  'Limited Consultant',
  'Contractor',
  'Sub-Contractor',
  'Owner',
  'Owner Contact Only',
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
    (idx: number) =>
    (discipline: SingleValue<{ value: string; label: string }>) => {
      setUsers((users) => {
        const updatedUsers = [...users];

        updatedUsers[idx] = {
          ...updatedUsers[idx],
          discipline: discipline?.value ?? null,
        };

        return updatedUsers;
      });
    };

  const handleChangeRole =
    (idx: number) => (role: SingleValue<{ value: string; label: string }>) => {
      setUsers((users) => {
        const updatedUsers = [...users];

        updatedUsers[idx] = {
          ...updatedUsers[idx],
          role: role?.value ?? null,
        };

        return updatedUsers;
      });
    };

  return (
    <Section title="Define Users">
      <div className="overflow-x-auto">
        <Table className="min-w-full table-fixed">
          <thead>
            <TableRow isHeader={true}>
              <TableHeaderCell className="min-w-[8rem]">First</TableHeaderCell>
              <TableHeaderCell />
              <TableHeaderCell className="min-w-[8rem]">Last</TableHeaderCell>
              <TableHeaderCell className="min-w-[10rem] p-2">
                Email
              </TableHeaderCell>
              <TableHeaderCell className="min-w-[10rem] p-2">
                Discipline
              </TableHeaderCell>
              <TableHeaderCell className="min-w-[15rem] p-2">
                Role
              </TableHeaderCell>
            </TableRow>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <TableRow key={user.emailAddress}>
                <TableDataCell className="break-all">
                  {user.firstName}
                </TableDataCell>
                <TableDataCell>
                  <Button
                    buttonType={ButtonType.Secondary}
                    className="!p-1 text-sm font-extrabold"
                    onClick={() => swapFirstAndLastName(idx)}
                  >
                    {'<>'}
                  </Button>
                </TableDataCell>
                <TableDataCell className="break-all">
                  {user.lastName}
                </TableDataCell>
                <TableDataCell className="break-all">
                  {user.emailAddress}
                </TableDataCell>
                <TableDataCell>
                  <Select
                    menuPortalTarget={document.body}
                    options={placeholderDisciplines.map((d) => ({
                      value: d,
                      label: d,
                    }))}
                    onChange={handleChangeDiscipline(idx)}
                    selectedValue={
                      user.discipline
                        ? { value: user.discipline, label: user.discipline }
                        : null
                    }
                  />
                </TableDataCell>
                <TableDataCell>
                  <Select
                    menuPortalTarget={document.body}
                    options={placeholderRoles.map((r) => ({
                      value: r,
                      label: r,
                    }))}
                    onChange={handleChangeRole(idx)}
                    selectedValue={
                      user.role ? { value: user.role, label: user.role } : null
                    }
                  />
                </TableDataCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
      <span className="mt-3 flex justify-between gap-4 md:justify-start">
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
