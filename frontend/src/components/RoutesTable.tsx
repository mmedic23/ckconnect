import { useEffect, useState } from 'react';
import { IconArrowNarrowRightDashed, IconArrowRightDashed, IconBrandUber, IconBus, IconPlane, IconTrain } from '@tabler/icons-react';
import { Button, Drawer, Flex, HoverCard, NavLink, Skeleton, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { apiUrl } from '@/Properties';
import { LocationDto, LocationsMap } from '@/types/location';
import { FindRouteResponse, RouteDto } from '@/types/route';
import { createOptionsFromLocationsMap, SearchableSelect, SearchableSelectItem } from './SearchableSelect';
import { RouteDetails } from './RouteDetails';
import { TransportationTypeIcon } from './TransportationTypeIcon';
import { DatePickerInput } from '@mantine/dates';

export function RoutesTable() {
  const [locations, setLocations] = useState<LocationsMap>([]);
  const [originLocation, setOriginLocation] = useState<LocationDto | undefined>();
  const [destinationLocation, setDestinationLocation] = useState<LocationDto | undefined>();
  const [searchDate, setSearchDate] = useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [foundRoutes, setFoundRoutes] = useState<FindRouteResponse | undefined>();

  const [selectedRoute, setSelectedRoute] = useState<RouteDto | undefined>();
  const [isRouteDrawerOpen, { open, close }] = useDisclosure(false);

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
    if (originLocation === undefined || destinationLocation === undefined || searchDate === null) {
      return;
    }
    setSelectedRoute(undefined);
    setFoundRoutes(undefined);
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); // TODO for debug, remove me!
    const queryParams = new URLSearchParams({
      originId: originLocation.id.toString(),
      destinationId: destinationLocation.id.toString(),
      date: searchDate.toISOString().substring(0, searchDate.toISOString().length - 1)
  });
    const routesResponse = await fetch(`${apiUrl}routes?${queryParams.toString()}`);
    if (!routesResponse.ok) {
      console.log(await routesResponse.text());
      return;
    }
    setIsLoading(false);
    setFoundRoutes(await routesResponse.json());
  };

  const locationOptions: SearchableSelectItem[] = createOptionsFromLocationsMap(locations);
  return (
    <Stack gap="xs" w={{ sm: '48em' }}>
      <Flex gap="md" p="md" ml="md" wrap="wrap">
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
        <DatePickerInput label='Pick a date' value={searchDate} onChange={setSearchDate} />
        <Button
          color="blue"
          mt="auto"
          loading={isLoading}
          disabled={originLocation === undefined || destinationLocation === undefined || searchDate === null}
          onClick={handleSearchClick}
        >
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
        <>
          <Title order={2} fw={400}>
            Found routes
          </Title>
          <Stack gap={0} justify="flex-start" align="flex-start">
            {foundRoutes.routes.map((routeDto) => {
              return (
                <NavLink
                  key={routeDto.order}
                  active={selectedRoute?.order === routeDto.order}
                  onClick={() => {setSelectedRoute(routeDto); open();}}
                  label={(() => {
                    const flightLeg = routeDto.legs.find((t) => t.type === 'FLIGHT');
                    return flightLeg ? `Via ${flightLeg.origin.name} (${flightLeg.origin.locationCode})` : '';
                  })()}
                  rightSection={(() => {
                    const transportTypeIcons = routeDto.legs.flatMap((t, index) =>
                      index === 0 ? [<TransportationTypeIcon key={'icon-'+t.id} type={t.type} />] : [<Text key={'text-'+t.id}>{t.origin.locationCode}</Text>, <TransportationTypeIcon key={'icon-'+t.id} type={t.type} />]
                    );
                    const transportIconsWithSeparators = transportTypeIcons.flatMap((icon, index) =>
                      index === transportTypeIcons.length - 1 ? [icon] : [icon, <IconArrowNarrowRightDashed key={'arrow-'+icon.key} stroke={1.5} />]
                    );
                    return transportIconsWithSeparators;
                  })()}
                />
              );
            })}
            <Drawer position='right' opened={isRouteDrawerOpen} onClose={close}>
              { selectedRoute !== undefined ? <RouteDetails route={selectedRoute} /> : <Skeleton /> }
            </Drawer>
          </Stack>
        </>
      ) : (
        <></>
      )}
    </Stack>
  );
}
