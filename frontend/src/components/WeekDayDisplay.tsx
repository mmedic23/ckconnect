import { Badge, Divider, Group, Paper, Text } from '@mantine/core';
import { WeekDay } from '@/types/transportation';

const weekDays: WeekDay[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export function WeekDayDisplay({ activeDays }: { activeDays: WeekDay[] }) {
  return (
    <Group gap={0} align="center" wrap='nowrap'>
      {weekDays.map((day, index) => {
        const isActive = activeDays.includes(day);
        return (
          <>
            <Badge circle size='xs' p={0} color={isActive ? '' : 'gray.7'} variant={isActive ? 'filled' : 'outline'} >
              <Text size="xs" fz={11}>{day[0]}</Text>
            </Badge>
            {index < weekDays.length - 1 && (
              <Divider w={10} size='md' orientation='horizontal' />
            )}
          </>
        );
      })}
    </Group>
  );
}
