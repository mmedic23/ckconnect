import { IconMapPin2 } from '@tabler/icons-react';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { Accordion, Flex, Grid, Stack, Text, TextInput } from '@mantine/core';
import { LocationDto } from '@/types/location';
import { SearchableSelect } from './SearchableSelect';

export function LocationsTable({ data }: { data: LocationDto[] }) {
  countries.registerLocale(enLocale);
  const countriesMap = Object.entries(countries.getNames('en', { select: 'official' })).map(
    ([code, name]) => {
      return {
        display: name,
        value: code,
      };
    }
  );
  return (
    <Stack my="lg" gap="xs">
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
      <Accordion multiple>
        {data.map((locationDto) => {
          return (
            <Accordion.Item key={locationDto.id} value={locationDto.name}>
              <Accordion.Control icon={<IconMapPin2 />}>
                <Grid mr="30%">
                  <Grid.Col span={6}>{locationDto.name}</Grid.Col>
                  <Grid.Col span={3}>
                    {locationDto.city}/{locationDto.country}
                  </Grid.Col>
                  <Grid.Col span={3}>{locationDto.locationCode}</Grid.Col>
                </Grid>
              </Accordion.Control>
              <Accordion.Panel>
                <Flex gap="lg" wrap="wrap">
                  <TextInput label="Name" defaultValue={locationDto.name} />
                  <TextInput label="Location Code" defaultValue={locationDto.locationCode} />
                  <TextInput label="City" defaultValue={locationDto.city} />
                  <SearchableSelect
                    items={countriesMap}
                    label="Country"
                    defaultItem={{
                      display: countries.getName(locationDto.country, 'en') ?? '',
                      value: locationDto.country,
                    }}
                  />
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Stack>
  );
}
