// Based on: https://mantine.dev/combobox/?e=SearchableSelect

import { useEffect, useState } from 'react';
import { CloseButton, Combobox, ScrollArea, TextInput, useCombobox } from '@mantine/core';
import { LocationsMap } from '@/types/location';

export function createOptionsFromLocationsMap(map: LocationsMap): SearchableSelectItem[] {
  return Object.entries(map)
    .map(a => a[1])
    .toSorted((a, b) => a.id - b.id)
    .map((loc) => { return ({ 'display': loc.name, 'value': loc.id?.toString() }) });
}

export const transportTypeOptions = [
  { 'display': 'FLIGHT', 'value': 'FLIGHT' },
  { 'display': 'BUS', 'value': 'BUS' },
  { 'display': 'SUBWAY', 'value': 'SUBWAY' },
  { 'display': 'UBER', 'value': 'UBER' },
]

export interface SearchableSelectItem {
  value: string;
  display: string;
}

export function SearchableSelect({
  items,
  label,
  defaultItem,
  onChange,
}: {
  items: SearchableSelectItem[];
  label: string;
  defaultItem: SearchableSelectItem | null;
  onChange: React.ReactEventHandler<HTMLInputElement>;
}) {
  const [selectedValue, setSelectedValue] = useState<string | null>(defaultItem !== null ? defaultItem.value : null);
  const [displayValue, setDisplayValue] = useState<string>(defaultItem !== null ? defaultItem.display : '');

  useEffect(() => {
    setSelectedValue(defaultItem !== null ? defaultItem.value : null);
    setDisplayValue(defaultItem !== null ? defaultItem.display : '');
  }, [defaultItem]);

  useEffect(() => {
    combobox.selectFirstOption();
  }, [displayValue])

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const handleSelect = (value: string | null) => {
    const selected = items.find((opt) => opt.value === value);
    setSelectedValue(value);
    setDisplayValue(selected ? selected.display : '');
    onChange({
      target: { value: selected ? selected.value : '' },
    } as React.ChangeEvent<HTMLInputElement>);
    if (value !== null) {
      combobox.closeDropdown();
    }
    else {
      combobox.openDropdown();
    }
  };

  const filteredItems = items.filter((item) => item.display.toLowerCase().includes(displayValue.toLowerCase()));

  return (
    <Combobox store={combobox} onOptionSubmit={handleSelect}>
      <Combobox.Target>
        <TextInput
          label={label}
          rightSection={
            selectedValue !== null ? (
              <CloseButton
                size="sm"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  handleSelect(null);
                }}
                aria-label="Clear value"
              />
            ) : (
              <Combobox.Chevron onClick={() => combobox.focusTarget()} />
            )
          }
          value={displayValue}
          onChange={(event) => {
            setDisplayValue(event.currentTarget.value); // Triggers search via re-render
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          placeholder="Select an option..."
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize type="scroll" mah={400}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Combobox.Option key={item.value} value={item.value}>
                  {item.display}
                </Combobox.Option>
              ))
            ) : (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
