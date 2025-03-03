import React from 'react';
import { Badge, Divider, Group, Text } from '@mantine/core';
import { WeekDay } from '@/types/transportation';

const weekDays: WeekDay[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export function WeekDayDisplay({ activeDays }: { activeDays: WeekDay[] }) {
  return (
    <Group gap={0} align="center" wrap="nowrap">
      {weekDays.map((day, index) => {
        const isActive = activeDays.includes(day);
        return (
          <React.Fragment key={day}>
            {' '}
            <Badge key={`wd-badge-${day}${index}`} circle size="xs" p={0} color={isActive ? '' : 'gray.7'} variant={isActive ? 'filled' : 'outline'}>
              <Text size="xs" fz={11}>
                {day[0]}
              </Text>
            </Badge>
            {index < weekDays.length - 1 && <Divider key={`wd-line-${day}${index}`} w={10} size="md" orientation="horizontal" />}
          </React.Fragment>
        );
      })}
    </Group>
  );
}
