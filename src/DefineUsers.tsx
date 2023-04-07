import { useCallback, useEffect, useState } from 'react';
import { ParsedUser } from './parseUserEmails';
import Button, { ButtonType } from './components/Button';
import Select from './components/Select';
import { type SingleValue } from 'react-select';

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
    <div className="mb-8">
      <h2 className="mb-3 text-xl font-semibold">Define Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed text-left text-sm lg:text-base">
          <thead>
            <tr className="border-2 border-slate-950 bg-slate-950 text-slate-50 dark:border-slate-50 dark:bg-slate-50 dark:text-slate-950">
              <th scope="col" className="min-w-[8rem] p-2">
                First
              </th>
              <th scope="col" className="p-2" />
              <th scope="col" className="min-w-[8rem] p-2">
                Last
              </th>
              <th scope="col" className="min-w-[10rem] p-2">
                Email
              </th>
              <th scope="col" className="min-w-[10rem] p-2">
                Discipline
              </th>
              <th scope="col" className="min-w-[15rem] p-2">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                className="border-2 odd:bg-white even:bg-slate-100 dark:odd:bg-slate-800 dark:even:bg-slate-900"
                key={user.emailAddress}
              >
                <td className="break-all p-2">{user.firstName}</td>
                <td className="p-2">
                  <Button
                    buttonType={ButtonType.Secondary}
                    className="!p-1 text-sm font-extrabold"
                    onClick={() => swapFirstAndLastName(idx)}
                  >
                    {'<>'}
                  </Button>
                </td>
                <td className="break-all p-2">{user.lastName}</td>
                <td className="break-all p-2">{user.emailAddress}</td>
                <td className="p-2">
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
                </td>
                <td className="p-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
};

export default DefineUsers;
