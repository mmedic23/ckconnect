import { IconFlagPin, IconMapPin, IconMapPin2, IconMapPinFilled, IconPinFilled, IconRoute2 } from '@tabler/icons-react';
import { Flex, Group, Space, Text, Timeline } from '@mantine/core';
import { RouteDto } from '@/types/route';
import { typeIcons } from './RoutesTable';

const typeDetails = {
    'FLIGHT': 'Take the flight',
    'BUS': 'Take a bus',
    'SUBWAY': 'Take the subway',
    'UBER': 'Take an Uber'
}

export function RouteDetails({ route }: { route: RouteDto }) {
  return (
    <Timeline bulletSize={36}>
      {route.legs.map((r, index) => {
        return (
          <>
            {index === 0 && (
              <>
                <Timeline.Item bullet={<IconMapPinFilled />} lineVariant="dashed">
                  <Text>{r.origin.name} ({r.origin.locationCode})</Text>
                  <Space h="md"></Space>
                </Timeline.Item>
                <Timeline.Item bullet={typeIcons[r.type]} lineVariant="dashed">
                  <Text c="dimmed">{typeDetails[r.type]}</Text>
                  <Space h="md"></Space>
                </Timeline.Item>
              </>
            )}
            {index !== 0 && index !== route.legs.length - 1 && (
              <>
                <Timeline.Item bullet={<IconMapPinFilled />} lineVariant="dashed">
                  <Text>{r.origin.name} ({r.origin.locationCode})</Text>
                  <Space h="md"></Space>
                </Timeline.Item>
                <Timeline.Item bullet={typeIcons[r.type]} lineVariant="dashed">
                  <Text c="dimmed">{typeDetails[r.type]}</Text>
                  <Space h="md"></Space>
                </Timeline.Item>
              </>
            )}
            {index === route.legs.length - 1 && (
              <>
                <Timeline.Item bullet={<IconMapPinFilled />} lineVariant="dashed">
                  <Text>{r.origin.name} ({r.origin.locationCode})</Text>
                  <Space h="md"></Space>
                </Timeline.Item>
                <Timeline.Item bullet={typeIcons[r.type]} lineVariant="dashed">
                  <Text c="dimmed">{typeDetails[r.type]}</Text>
                  <Space h="md"></Space>
                </Timeline.Item>
                <Timeline.Item bullet={<IconFlagPin />} lineVariant="dashed">
                  <Text>{r.destination.name} ({r.destination.locationCode})</Text>
                </Timeline.Item>
              </>
            )}
          </>
        );
      })}
    </Timeline>
  );
}
