// Based on: https://mantine.dev/combobox/?e=SearchableSelect

import { useState } from 'react';
import { CloseButton, Combobox, ScrollArea, TextInput, useCombobox } from '@mantine/core';

interface SearchableSelectItem {
  value: string;
  display: string;
}

export function SearchableSelect({
  items,
  label,
  defaultItem,
}: {
  items: SearchableSelectItem[];
  label: string;
  defaultItem: SearchableSelectItem | null;
}) {
  const [selectedValue, setSelectedValue] = useState<string | null>(
    defaultItem !== null ? defaultItem.value : null
  );
  const [displayValue, setDisplayValue] = useState<string>(
    defaultItem !== null ? defaultItem.display : ''
  );

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const handleSelect = (value: string | null) => {
    const selected = items.find((opt) => opt.value === value);
    setSelectedValue(value);
    setDisplayValue(selected ? selected.display : '');
    combobox.closeDropdown();
  };

  const filteredItems = items.filter((item) =>
    item.display.toLowerCase().includes(displayValue.toLowerCase())
  );

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
                  setSelectedValue(null);
                  setDisplayValue('');
                }}
                aria-label="Clear value"
              />
            ) : (
              <Combobox.Chevron onClick={() => combobox.focusTarget()} />
            )
          }
          value={displayValue}
          onChange={(event) => {
            setDisplayValue(event.currentTarget.value);
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
