import { useEffect, useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Accordion, ActionIcon, Grid, Group, Stack, Text } from '@mantine/core';
import { apiUrl } from '@/Properties';
import { LocationDto } from '@/types/location';
import { LocationDetails } from './LocationDetails';

export function LocationsTable() {
  const [locations, setLocations] = useState<LocationDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${apiUrl}locations`);
      if (!response.ok) {
        console.log(await response.text());
        return;
      }
      const locationsJson = await response.json();
      setLocations(locationsJson);
    };

    fetchData();
  }, []);

  const handleLocationUpdate = async (updatedLocation: LocationDto) => {
    const response = await fetch(`${apiUrl}locations/${updatedLocation.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedLocation),
    });

    if (!response.ok) {
      console.log(await response.text());
      return; // TODO
    }

    setLocations((prev) =>
      prev.map((loc) => (loc.id === updatedLocation.id ? updatedLocation : loc))
    );
  };

  const handleLocationDelete = async (deletedLocation: LocationDto) => {
    const response = await fetch(`${apiUrl}locations/${deletedLocation.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      console.log(await response.text());
      return; // TODO
    }

    setLocations((prev) => prev.filter((loc) => loc.id !== deletedLocation.id));
  };

  return (
    <Stack my="lg" gap="xs" pos="relative">
      <Grid ml={60} mr="30%">
        <Grid.Col p={0} span={6}>
          <Text fw={700}>Name</Text>
        </Grid.Col>
        <Grid.Col p={0} span={3}>
          <Text fw={700}>City/Country</Text>
        </Grid.Col>
        <Grid.Col p={0} span={3}>
          <Text fw={700}>Location Code</Text>
        </Grid.Col>
      </Grid>
      <ActionIcon pos="absolute" right={3} top={-20} size="input-md" color="lime" radius="xl">
        <IconPlus />
      </ActionIcon>
      <Accordion multiple>
        {locations
          .toSorted((a, b) => a.id - b.id)
          .map((locationDto) => {
            return (
              <LocationDetails
                key={locationDto.id}
                locationDto={locationDto}
                onUpdate={handleLocationUpdate}
                onDelete={handleLocationDelete}
              />
            );
          })}
      </Accordion>
    </Stack>
  );
}
