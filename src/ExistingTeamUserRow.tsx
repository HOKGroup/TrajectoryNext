import {
  type FC,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { type SingleValue } from 'react-select';
import {
  DisciplineDetailsComponent,
  RoleDetailsComponent,
  ServiceDetailsComponent,
} from './api/types';
import { type ExistingUser } from './ExistingTeam';
import TableRow from './components/Table/TableRow';
import TableDataCell from './components/Table/TableDataCell';
import Select from './components/Select';
import { disciplines, roles } from './api/mockData';

interface Props {
  user: ExistingUser;
  setUsers: Dispatch<SetStateAction<ExistingUser[]>>;
  idx: number;
  services: ServiceDetailsComponent[];
}
const ExistingTeamUserRow: FC<Props> = ({ user, setUsers, idx, services }) => {
  const handleChangeDiscipline = useCallback(
    (discipline: SingleValue<DisciplineDetailsComponent>) => {
      discipline &&
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
      role &&
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
          selectedValue={user.discipline}
          value={user.discipline}
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
          selectedValue={user.role}
          value={user.role}
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
