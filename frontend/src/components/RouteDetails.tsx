import React from 'react';
import { IconFlagPin, IconMapPinFilled } from '@tabler/icons-react';
import { Space, Text, Timeline } from '@mantine/core';
import { RouteDto } from '@/types/route';
import { TransportationTypeIcon } from './TransportationTypeIcon';

const typeDetails = {
  FLIGHT: 'Take the flight',
  BUS: 'Take a bus',
  SUBWAY: 'Take the subway',
  UBER: 'Take an Uber',
};

export function RouteDetails({ route }: { route: RouteDto }) {
  return (
    <Timeline bulletSize={36}>
      {route.legs.map((r, index) => {
        return (
          <>
            {index === 0 && (
              <React.Fragment key={`cont-${index}`}>
                <Timeline.Item key={`loc-${r.id}`} bullet={<IconMapPinFilled />} lineVariant="dashed">
                  <Text>
                    {r.origin.name} ({r.origin.locationCode})
                  </Text>
                  <Space h="md" />
                </Timeline.Item>
                <Timeline.Item key={`icon-${r.id}`} bullet={<TransportationTypeIcon type={r.type} />} lineVariant="dashed">
                  <Text c="dimmed">{typeDetails[r.type]}</Text>
                  <Space h="md" />
                </Timeline.Item>
              </React.Fragment>
            )}
            {index !== 0 && index !== route.legs.length - 1 && (
              <React.Fragment key={`cont-${index}`}>
                <Timeline.Item key={`loc-${r.id}`} bullet={<IconMapPinFilled />} lineVariant="dashed">
                  <Text>
                    {r.origin.name} ({r.origin.locationCode})
                  </Text>
                  <Space h="md" />
                </Timeline.Item>
                <Timeline.Item key={`icon-${r.id}`} bullet={<TransportationTypeIcon type={r.type} />} lineVariant="dashed">
                  <Text c="dimmed">{typeDetails[r.type]}</Text>
                  <Space h="md" />
                </Timeline.Item>
              </React.Fragment>
            )}
            {index === route.legs.length - 1 && (
              <React.Fragment key={`cont-${index}`}>
                <Timeline.Item key={`loc-${r.id}`} bullet={<IconMapPinFilled />} lineVariant="dashed">
                  <Text>
                    {r.origin.name} ({r.origin.locationCode})
                  </Text>
                  <Space h="md" />
                </Timeline.Item>
                <Timeline.Item key={`icon-${r.id}`} bullet={<TransportationTypeIcon type={r.type} />} lineVariant="dashed">
                  <Text c="dimmed">{typeDetails[r.type]}</Text>
                  <Space h="md" />
                </Timeline.Item>
                <Timeline.Item key={`finalloc-${r.id}`} bullet={<IconFlagPin />} lineVariant="dashed">
                  <Text>
                    {r.destination.name} ({r.destination.locationCode})
                  </Text>
                </Timeline.Item>
              </React.Fragment>
            )}
          </>
        );
      })}
    </Timeline>
  );
}
