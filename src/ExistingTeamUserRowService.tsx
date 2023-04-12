import { useCallback, type FC } from 'react';
import { Person, UserChanges } from './ExistingTeam';

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
    <input
      type="checkbox"
      className="h-4 w-4"
      checked={isChecked}
      onChange={handleChangeService}
    />
  );
};

export default ExistingTeamUserRowService;
