import { useEffect, useState } from 'react';
import { Title } from '@mantine/core';
import { LocationsTable } from '@/components/LocationsTable';
import { apiUrl } from '@/Properties';
import { LocationDto } from '@/types/location';

export function Locations() {
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

  return (
    <>
      <Title>Locations</Title>
      <LocationsTable data={locations} />
    </>
  );
}
