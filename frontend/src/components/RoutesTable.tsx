import { useEffect, useState } from 'react';
import { Button, Flex, Skeleton, Stack, Title } from '@mantine/core';
import { apiUrl } from '@/Properties';
import { LocationDto, LocationsMap } from '@/types/location';
import { FindRouteResponse } from '@/types/route';
import { createOptionsFromLocationsMap, SearchableSelect, SearchableSelectItem } from './SearchableSelect';

export function RoutesTable() {
  const [locations, setLocations] = useState<LocationsMap>([]);
  const [originLocation, setOriginLocation] = useState<LocationDto | undefined>();
  const [destinationLocation, setDestinationLocation] = useState<LocationDto | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [foundRoutes, setFoundRoutes] = useState<FindRouteResponse | undefined>();

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch(`${apiUrl}locations`);
      if (!response.ok) {
        console.log(await response.text());
        return;
      }
      const locationsJson: LocationDto[] = await response.json();
      const locaitonsMap: LocationsMap = Object.fromEntries(locationsJson.map((location) => [location.id, location]));
      setLocations(locaitonsMap);
    };

    fetchLocations();
  }, []);

  const handleSearchInputChanged = (input: 'origin' | 'destination') => (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputLocation = event.target.value ? locations[Number(event.target.value)] : undefined;
    if (input === 'origin') {
      setOriginLocation(inputLocation);
    } else if (input === 'destination') {
      setDestinationLocation(inputLocation);
    }
  };

  const handleSearchClick = async () => {
    if (originLocation === undefined || destinationLocation === undefined) {
      return;
    }
    setFoundRoutes(undefined);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const routesResponse = await fetch(`${apiUrl}routes?originId=${originLocation.id}&destinationId=${destinationLocation.id}`);
    if (!routesResponse.ok) {
      console.log(await routesResponse.text());
      return;
    }
    setIsLoading(false);
    setFoundRoutes(await routesResponse.json());
  };

  const locationOptions: SearchableSelectItem[] = createOptionsFromLocationsMap(locations);
  return (
    <Stack gap="xs">
      <Flex gap="md" p="md" ml="md">
        <SearchableSelect
          key="search-origin"
          label="Origin"
          items={locationOptions}
          defaultItem={null}
          onChange={handleSearchInputChanged('origin')}
        />
        <SearchableSelect
          key="search-dest"
          label="Destination"
          items={locationOptions}
          defaultItem={null}
          onChange={handleSearchInputChanged('destination')}
        />
        <Button color="blue" mt="auto" disabled={originLocation === undefined || destinationLocation === undefined} onClick={handleSearchClick}>
          Search
        </Button>{' '}
      </Flex>
      {isLoading ? (
        <>
          {' '}
          {Array(5)
            .fill(0)
            .map((_, index) => {
              return <Skeleton height={30} key={`loading-sk-${index}`} />;
            })}{' '}
        </>
      ) : (
        <></>
      )}
      {foundRoutes && (foundRoutes.numberOfRoutesFound === 0 || foundRoutes.routes.length === 0) ? <Title>No results found!</Title> : <></>}
      {foundRoutes && foundRoutes.numberOfRoutesFound > 0 && foundRoutes.routes.length > 0 ? (
        foundRoutes.routes.map((routeDto) => {
          return (
            <Button variant="outline" key={routeDto.order}>
              Via {routeDto.legs.find((t) => t.type === 'FLIGHT')?.origin.name}
            </Button>
          );
        })
      ) : (
        <></>
      )}
    </Stack>
  );
}
