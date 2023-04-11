import { type FC, useCallback } from 'react';
import { type SingleValue } from 'react-select';
import {
  DisciplineDetailsComponent,
  RoleDetailsComponent,
  ServiceDetailsComponent,
} from './api/types';
import { type ExistingUser, type UserChanges } from './ExistingTeam';
import TableRow from './components/Table/TableRow';
import TableDataCell from './components/Table/TableDataCell';
import Select from './components/Select';
import { disciplines, roles } from './api/mockData';

interface Props {
  user: ExistingUser;
  idx: number;
  services: ServiceDetailsComponent[];
  userChanges: UserChanges | undefined;
  setUserChanges: (idx: number, userChanges: UserChanges | undefined) => void;
}

const ExistingTeamUserRow: FC<Props> = ({
  user,
  idx,
  services,
  userChanges,
  setUserChanges,
}) => {
  const handleChangeDiscipline = useCallback(
    (discipline: SingleValue<DisciplineDetailsComponent>) => {
      if (!discipline) return;

      const existingDiscipline = user.discipline;

      const newUserChanges: UserChanges = {
        ...(userChanges || {}),
        discipline,
      };

      if (existingDiscipline.id === discipline.id) {
        delete newUserChanges.discipline;
      }

      if (!Object.keys(newUserChanges).length) {
        setUserChanges(idx, undefined);
      } else {
        setUserChanges(idx, newUserChanges);
      }
    },
    [idx, user, userChanges, setUserChanges]
  );

  const handleChangeRole = useCallback(
    (role: SingleValue<RoleDetailsComponent>) => {
      if (!role) return;

      const existingRole = user.role;

      const newUserChanges: UserChanges = {
        ...(userChanges || {}),
        role,
      };

      if (existingRole.id === role.id) {
        delete newUserChanges.role;
      }

      if (!Object.keys(newUserChanges).length) {
        setUserChanges(idx, undefined);
      } else {
        setUserChanges(idx, newUserChanges);
      }
    },
    [idx, user, userChanges, setUserChanges]
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

  const discipline = userChanges?.discipline ?? user.discipline;
  const role = userChanges?.role ?? user.role;

  return (
    <TableRow key={user.emailAddress}>
      <TableDataCell data-label="First">{user.firstName}</TableDataCell>
      <TableDataCell data-label="Last">{user.lastName}</TableDataCell>
      <TableDataCell data-label="Email">{user.emailAddress}</TableDataCell>
      <TableDataCell data-label="Discipline">
        <Select
          isClearable={false}
          aria-label="Discipline"
          menuPortalTarget={document.body}
          options={disciplines}
          onChange={handleChangeDiscipline}
          value={discipline}
          getOptionValue={getDisciplineOptionValue}
          getOptionLabel={getDisciplineOptionLabel}
        />
      </TableDataCell>

      <TableDataCell data-label="Role">
        <Select
          isClearable={false}
          aria-label="Discipline"
          menuPortalTarget={document.body}
          options={roles}
          onChange={handleChangeRole}
          value={role}
          getOptionValue={getRoleOptionValue}
          getOptionLabel={getRoleOptionLabel}
        />
      </TableDataCell>
      {services.map((s) => (
        <TableDataCell
          key={s.id}
          data-label={s.payload.name}
          className="break-normal"
        >
          {/* TODO: Service status */}
          {'\u00A0'}
        </TableDataCell>
      ))}
    </TableRow>
  );
};

export default ExistingTeamUserRow;
