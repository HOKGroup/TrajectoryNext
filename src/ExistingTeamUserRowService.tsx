import { useCallback, type FC } from 'react';
import { Person, UserChanges } from './ExistingTeam';
import classNames from 'classnames';
import { IconCheck } from './components/Icons';

interface Props {
  serviceEntityId: string;
  userChanges: UserChanges | undefined;
  person: Person;
  onChangeService: (serviceEntityId: string) => void;
}

const ExistingTeamUserRowService: FC<Props> = ({
  serviceEntityId,
  userChanges,
  person,
  onChangeService,
}) => {
  const handleChangeService = useCallback(() => {
    onChangeService(serviceEntityId);
  }, [serviceEntityId, onChangeService]);

  const personHasService = person.services.has(serviceEntityId);
  const serviceHasChanged = Boolean(
    userChanges?.services?.has(serviceEntityId)
  );

  const isChecked = personHasService === serviceHasChanged;

  return (
    <label className="align-middle">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChangeService}
        className="absolute hidden h-0 w-0 overflow-hidden"
      />
      <span
        className={classNames(
          'inline-block h-6 w-6 rounded-sm border-2 border-gray-500',
          {
            'border-4 !border-green-600': serviceHasChanged && !isChecked,
            'bg-blue-600': !serviceHasChanged && isChecked,
            'bg-green-600': serviceHasChanged && isChecked,
          }
        )}
      >
        {isChecked && <IconCheck className="h-6 w-6 invert" />}
      </span>
    </label>
  );
};

export default ExistingTeamUserRowService;
