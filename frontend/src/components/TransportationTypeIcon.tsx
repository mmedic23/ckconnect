import { IconBrandUber, IconBus, IconPlane, IconTrain } from '@tabler/icons-react';
import { HoverCard, Text } from '@mantine/core';
import { TransportationType } from '@/types/transportation';

export function TransportationTypeIcon({ type }: { type: TransportationType }) {
  switch (type) {
    case 'FLIGHT':
      return (
        <HoverCard openDelay={250}>
          <HoverCard.Target>
            <IconPlane stroke={1.5} />
          </HoverCard.Target>
          <HoverCard.Dropdown p="xs">
            <Text size="sm">Flight</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      );
    case 'BUS':
      return (
        <HoverCard openDelay={250}>
          <HoverCard.Target>
            <IconBus stroke={1.5} />
          </HoverCard.Target>
          <HoverCard.Dropdown p="xs">
            <Text size="sm">Bus</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      );
    case 'SUBWAY':
      return (
        <HoverCard openDelay={250}>
          <HoverCard.Target>
            <IconTrain stroke={1.5} />
          </HoverCard.Target>
          <HoverCard.Dropdown p="xs">
            <Text size="sm">Subway</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      );
    case 'UBER':
      return (
        <HoverCard openDelay={250}>
          <HoverCard.Target>
            <IconBrandUber stroke={1.5} />
          </HoverCard.Target>
          <HoverCard.Dropdown p="xs">
            <Text size="sm">Uber</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      );
    default:
      break;
  }
}
