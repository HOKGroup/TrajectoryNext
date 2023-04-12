import { type FormEvent, type FC, useCallback } from 'react';
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
import { IconXMark } from './components/Icons';

interface Props {
  user: DefinedUser;
  setUser: (idx: number, user: DefinedUser) => void;
  removeUser: (idx: number) => void;
  idx: number;
}

const DefineUsersUserRow: FC<Props> = ({ user, setUser, removeUser, idx }) => {
  const swapFirstAndLastName = useCallback(
    () =>
      setUser(idx, {
        ...user,
        firstName: user.lastName,
        lastName: user.firstName,
      }),
    [setUser, idx, user]
  );

  const handleChangeFirstName = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const firstName = event?.currentTarget.value;

      setUser(idx, {
        ...user,
        firstName,
      });
    },
    [idx, setUser, user]
  );

  const handleChangeLastName = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const lastName = event.currentTarget.value;

      setUser(idx, {
        ...user,
        lastName,
      });
    },
    [idx, setUser, user]
  );

  const handleChangeEmailAddress = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const emailAddress = event.currentTarget.value;

      setUser(idx, {
        ...user,
        emailAddress,
      });
    },
    [idx, setUser, user]
  );

  const handleChangeDiscipline = useCallback(
    (discipline: SingleValue<DisciplineDetailsComponent>) => {
      setUser(idx, {
        ...user,
        discipline,
      });
    },
    [idx, setUser, user]
  );

  const handleChangeRole = useCallback(
    (role: SingleValue<RoleDetailsComponent>) => {
      setUser(idx, {
        ...user,
        role,
      });
    },
    [idx, setUser, user]
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

  const handleRemoveUser = useCallback(() => {
    removeUser(idx);
  }, [idx, removeUser]);

  return (
    <TableRow>
      <TableDataCell className="text-right">
        <Button
          buttonType={ButtonType.Warning}
          onClick={handleRemoveUser}
          className="px-2 py-1 text-sm font-extrabold lg:px-3 lg:py-0"
        >
          <span className="flex flex-row items-center gap-1">
            <div className="lg:hidden">Remove</div>
            <IconXMark className="h-4 w-4 lg:h-6 lg:w-6" />
          </span>
        </Button>
      </TableDataCell>
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
          menuPortalTarget={document.body}
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
          menuPortalTarget={document.body}
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
