import { useEffect, useState } from 'react';
import {
  IconCancel,
  IconCheck,
  IconDeviceFloppy,
  IconMapPin2,
  IconRestore,
  IconTrash,
} from '@tabler/icons-react';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { Accordion, ActionIcon, Flex, Grid, Group, TextInput } from '@mantine/core';
import { LocationDto } from '@/types/location';
import { SearchableSelect } from './SearchableSelect';

countries.registerLocale(enLocale);
const countriesMap = Object.entries(countries.getNames('en', { select: 'official' })).map(
  ([code, name]) => {
    return {
      display: name,
      value: code,
    };
  }
);
console.log('Render!');

export function LocationDetails({
  locationDto,
  onUpdate,
  onDelete,
}: {
  locationDto: LocationDto;
  onUpdate: (updatedLocation: LocationDto) => Promise<void>;
  onDelete: (deletedLocation: LocationDto) => Promise<void>;
}) {
  const [location, setLocation] = useState(locationDto);
  const [headerLocation, setHeaderLocation] = useState(locationDto);
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  useEffect(() => {
    setLocation(locationDto);
    setHeaderLocation(locationDto);
  }, [locationDto]);

  const handleChange =
    (field: keyof LocationDto) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocation((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      setHasUnsavedChanges(true);
    };

  const handleSubmit = async () => {
    setIsUpdating(true);
    await onUpdate(location);

    setHeaderLocation(location);
    setHasUnsavedChanges(false);
    setIsUpdating(false);
  };

  const handleDelete = () => {
    setIsConfirmingDelete(true);
  };

  const handleDeleteConfirm = async () => {
    setIsUpdating(true);
    await onDelete(location);
    setIsUpdating(false);
    setIsConfirmingDelete(false);
  };

  const handleDeleteCancel = () => {
    setIsConfirmingDelete(false);
  };

  const resetEditorState = () => {
    setLocation(headerLocation);
    setHasUnsavedChanges(false);
  };

  return (
    <Accordion.Item key={headerLocation.id} value={headerLocation.id.toString()}>
      <Accordion.Control icon={<IconMapPin2 />}>
        <Grid mr="30%">
          <Grid.Col span={6}>{headerLocation.name}</Grid.Col>
          <Grid.Col span={3}>
            {headerLocation.city}/{headerLocation.country}
          </Grid.Col>
          <Grid.Col span={3}>{headerLocation.locationCode}</Grid.Col>
        </Grid>
      </Accordion.Control>
      <Accordion.Panel>
        <Flex gap="lg" wrap="wrap">
          <TextInput label="Name" value={location.name} onChange={handleChange('name')} />
          <TextInput
            label="Location Code"
            value={location.locationCode}
            onChange={handleChange('locationCode')}
          />
          <TextInput label="City" value={location.city} onChange={handleChange('city')} />
          <SearchableSelect
            items={countriesMap}
            label="Country"
            defaultItem={{
              display: countries.getName(location.country, 'en') ?? '',
              value: location.country,
            }}
            onChange={handleChange('country')}
          />
          <Group gap="xs">
            <ActionIcon
              size="input-md"
              mt="auto"
              color="lime"
              loading={isUpdating}
              disabled={!hasUnsavedChanges}
              onClick={handleSubmit}
            >
              <IconDeviceFloppy />
            </ActionIcon>
            <ActionIcon
              size="input-md"
              mt="auto"
              color="blue"
              loading={isUpdating}
              disabled={!hasUnsavedChanges}
              onClick={resetEditorState}
            >
              <IconRestore />
            </ActionIcon>
            {isConfirmingDelete ? (
              <>
                <ActionIcon
                  size="input-md"
                  mt="auto"
                  color="cyan"
                  loading={isUpdating}
                  onClick={handleDeleteCancel}
                >
                  <IconCancel />
                </ActionIcon>
                <ActionIcon
                  size="input-md"
                  mt="auto"
                  color="red"
                  loading={isUpdating}
                  onClick={handleDeleteConfirm}
                >
                  <IconCheck />
                </ActionIcon>
              </>
            ) : (
              <ActionIcon size="input-md" mt="auto" color="red" onClick={handleDelete}>
                <IconTrash />
              </ActionIcon>
            )}
          </Group>
        </Flex>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
