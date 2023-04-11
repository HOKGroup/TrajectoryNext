import {
  type FormEvent,
  type SetStateAction,
  type FC,
  type Dispatch,
  useCallback,
} from 'react';
import { disciplines, roles } from './api/mockData';
import Button, { ButtonType } from './components/Button';
import Select from './components/Select';
import TableDataCell from './components/Table/TableDataCell';
import TableRow from './components/Table/TableRow';
import { type DefinedUser } from './DefineUsers';
import { type SingleValue } from 'react-select';
import {
  type DisciplineDetailsComponent,
  type RoleDetailsComponent,
} from './api/types';

interface Props {
  user: DefinedUser;
  setUsers: Dispatch<SetStateAction<DefinedUser[]>>;
  idx: number;
}

const DefineUsersUserRow: FC<Props> = ({ user, setUsers, idx }) => {
  const swapFirstAndLastName = useCallback(
    () =>
      setUsers((users) => {
        const newUsers = [...users];

        newUsers[idx] = {
          ...newUsers[idx],
          firstName: newUsers[idx].lastName,
          lastName: newUsers[idx].firstName,
        };

        return newUsers;
      }),
    [setUsers, idx]
  );

  const handleChangeFirstName = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const firstName = event?.currentTarget.value;

      setUsers((users) => {
        const updatedUsers = [...users];

        updatedUsers[idx] = {
          ...updatedUsers[idx],
          firstName,
        };

        return updatedUsers;
      });
    },
    [idx, setUsers]
  );

  const handleChangeLastName = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const lastName = event.currentTarget.value;

      setUsers((users) => {
        const updatedUsers = [...users];

        updatedUsers[idx] = {
          ...updatedUsers[idx],
          lastName,
        };

        return updatedUsers;
      });
    },
    [idx, setUsers]
  );

  const handleChangeEmailAddress = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const emailAddress = event.currentTarget.value;

      setUsers((users) => {
        const updatedUsers = [...users];

        updatedUsers[idx] = {
          ...updatedUsers[idx],
          emailAddress,
        };

        return updatedUsers;
      });
    },
    [idx, setUsers]
  );

  const handleChangeDiscipline = useCallback(
    (discipline: SingleValue<DisciplineDetailsComponent>) => {
      setUsers((users) => {
        const updatedUsers = [...users];

        updatedUsers[idx] = {
          ...updatedUsers[idx],
          discipline,
        };

        return updatedUsers;
      });
    },
    [idx, setUsers]
  );

  const handleChangeRole = useCallback(
    (role: SingleValue<RoleDetailsComponent>) => {
      setUsers((users) => {
        const updatedUsers = [...users];

        updatedUsers[idx] = {
          ...updatedUsers[idx],
          role,
        };

        return updatedUsers;
      });
    },
    [idx, setUsers]
  );

  const getRoleOptionValue = useCallback(
    (role: SingleValue<RoleDetailsComponent>) => role?.id ?? '',
    []
  );

  const getRoleOptionLabel = useCallback(
    (role: SingleValue<RoleDetailsComponent>) => role?.payload.name ?? '',
    []
  );

  const getDisciplineOptionValue = useCallback(
    (discipline: SingleValue<DisciplineDetailsComponent>) =>
      discipline?.id ?? '',
    []
  );

  const getDisciplineOptionLabel = useCallback(
    (discipline: SingleValue<DisciplineDetailsComponent>) =>
      discipline?.payload.name ?? '',
    []
  );

  return (
    <TableRow>
      <TableDataCell data-label="First" className="break-all">
        <input
          className="w-full rounded-md border-2 px-2 py-1 text-slate-950 outline-none focus:border-transparent focus:ring focus:ring-blue-300"
          placeholder="First name"
          value={user.firstName ?? undefined}
          onInput={handleChangeFirstName}
        />
      </TableDataCell>
      <TableDataCell className="text-right">
        {user.firstName && user.lastName && (
          <Button
            buttonType={ButtonType.Secondary}
            className="px-2 py-1 text-sm font-extrabold lg:py-0"
            onClick={swapFirstAndLastName}
          >
            {'Swap First/Last'}
          </Button>
        )}
      </TableDataCell>
      <TableDataCell data-label="Last" className="break-all">
        <input
          className="w-full rounded-md border-2 px-2 py-1 text-slate-950 outline-none focus:border-transparent focus:ring focus:ring-blue-300"
          placeholder="Last name"
          value={user.lastName ?? ''}
          onInput={handleChangeLastName}
        />
      </TableDataCell>
      <TableDataCell data-label="Email" className="break-all">
        <input
          className="w-full rounded-md border-2 px-2 py-1 text-slate-950 outline-none focus:border-transparent focus:ring focus:ring-blue-300"
          placeholder="Email address"
          value={user.emailAddress}
          onInput={handleChangeEmailAddress}
        />
      </TableDataCell>
      <TableDataCell data-label="Discipline">
        <Select
          aria-label="Discipline"
          options={disciplines}
          onChange={handleChangeDiscipline}
          value={user.discipline}
          getOptionValue={getDisciplineOptionValue}
          getOptionLabel={getDisciplineOptionLabel}
        />
      </TableDataCell>
      <TableDataCell data-label="Role">
        <Select
          aria-label="Role"
          options={roles}
          onChange={handleChangeRole}
          value={user.role}
          getOptionValue={getRoleOptionValue}
          getOptionLabel={getRoleOptionLabel}
        />
      </TableDataCell>
    </TableRow>
  );
};

export default DefineUsersUserRow;
