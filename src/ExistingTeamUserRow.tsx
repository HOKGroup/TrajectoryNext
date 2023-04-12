import { type FC, useCallback, type FormEvent } from 'react';
import { type SingleValue } from 'react-select';
import {
  DisciplineDetailsComponent,
  RoleDetailsComponent,
  ServiceDetailsComponent,
} from './api/types';
import { type Person, type UserChanges } from './ExistingTeam';
import TableRow from './components/Table/TableRow';
import TableDataCell from './components/Table/TableDataCell';
import Select from './components/Select';
import { disciplines, roles } from './api/mockData';
import Input from './components/Input';

interface Props {
  person: Person;
  idx: number;
  services: ServiceDetailsComponent[];
  userChanges: UserChanges | undefined;
  setUserChanges: (idx: number, userChanges: UserChanges | undefined) => void;
}

const ExistingTeamUserRow: FC<Props> = ({
  person,
  idx,
  services,
  userChanges,
  setUserChanges,
}) => {
  const handleChangeFirstName = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const firstName = event.currentTarget.value;
      const existingFirstName = person.personDetails.payload.firstName;

      const newUserChanges: UserChanges = {
        ...(userChanges ?? {}),
        firstName,
      };

      if (existingFirstName === firstName) {
        delete newUserChanges.firstName;
      }

      if (!Object.keys(newUserChanges).length) {
        setUserChanges(idx, undefined);
      } else {
        setUserChanges(idx, newUserChanges);
      }
    },
    [idx, person, userChanges, setUserChanges]
  );

  const handleChangeLastName = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const lastName = event.currentTarget.value;
      const existingLastName = person.personDetails.payload.lastName;

      const newUserChanges: UserChanges = {
        ...(userChanges ?? {}),
        lastName,
      };

      if (existingLastName === lastName) {
        delete newUserChanges.lastName;
      }

      if (!Object.keys(newUserChanges).length) {
        setUserChanges(idx, undefined);
      } else {
        setUserChanges(idx, newUserChanges);
      }
    },
    [idx, person, userChanges, setUserChanges]
  );

  const handleChangeDiscipline = useCallback(
    (discipline: SingleValue<DisciplineDetailsComponent>) => {
      if (!discipline) return;

      const existingDiscipline = person.disciplineDetails;

      const newUserChanges: UserChanges = {
        ...(userChanges ?? {}),
        discipline,
      };

      if (existingDiscipline?.id === discipline.id) {
        delete newUserChanges.discipline;
      }

      if (!Object.keys(newUserChanges).length) {
        setUserChanges(idx, undefined);
      } else {
        setUserChanges(idx, newUserChanges);
      }
    },
    [idx, person, userChanges, setUserChanges]
  );

  const handleChangeRole = useCallback(
    (role: SingleValue<RoleDetailsComponent>) => {
      if (!role) return;

      const existingRole = person.roleDetails;

      const newUserChanges: UserChanges = {
        ...(userChanges ?? {}),
        role,
      };

      if (existingRole?.id === role.id) {
        delete newUserChanges.role;
      }

      if (!Object.keys(newUserChanges).length) {
        setUserChanges(idx, undefined);
      } else {
        setUserChanges(idx, newUserChanges);
      }
    },
    [idx, person, userChanges, setUserChanges]
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

  const discipline = userChanges?.discipline ?? person.disciplineDetails;
  const role = userChanges?.role ?? person.roleDetails;
  const firstName =
    userChanges?.firstName ?? person.personDetails.payload.firstName;
  const lastName =
    userChanges?.lastName ?? person.personDetails.payload.lastName;

  return (
    <TableRow key={person.personDetails.payload.emailAddress}>
      <TableDataCell data-label="First">
        <Input
          placeholder="First name"
          value={firstName}
          onInput={handleChangeFirstName}
        />
      </TableDataCell>
      <TableDataCell data-label="Last">
        <Input
          placeholder="Last name"
          value={lastName}
          onInput={handleChangeLastName}
        />
      </TableDataCell>
      <TableDataCell data-label="Email">
        {person.personDetails.payload.emailAddress}
      </TableDataCell>
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
          {/* TODO: onChange */}
          <input
            type="checkbox"
            checked={person.services.has(s.entityId)}
            readOnly={true}
          />
        </TableDataCell>
      ))}
    </TableRow>
  );
};

export default ExistingTeamUserRow;
