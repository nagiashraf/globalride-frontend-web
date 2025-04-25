import { useState } from "react";
import {
  CloseButton,
  Combobox,
  Loader,
  TextInput,
  useCombobox,
} from "@mantine/core";
import { useSearchBranches } from "@/api/branchApi";
import { useDebounce } from "@/hooks/useDebounce";
import { useTranslation } from "react-i18next";
import { IconMapPin, IconPlane, IconSearch } from "@tabler/icons-react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

type Props<TField extends FieldValues> = {
  control: Control<TField>;
  name: Path<TField>;
  label: string;
  placeholder: string;
  onSelect?: (value: string) => void;
};

const BranchAutocomplete = <TField extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  onSelect,
}: Props<TField>) => {
  const { t } = useTranslation(["common"]);

  const { field, fieldState } = useController({
    name,
    control,
  });

  const combobox = useCombobox({
    scrollBehavior: "smooth",
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue);

  const { data, isLoading } = useSearchBranches(debouncedValue);

  const options = (data || []).map((item) => (
    <Combobox.Option value={item.name} key={item.languageCode + item.id}>
      <div className="flex items-center gap-2">
        <span>
          {item.type === "Airport" ? (
            <IconPlane size={16} />
          ) : (
            <IconMapPin size={16} />
          )}
        </span>
        <div>
          <p>{item.name}</p>
          <p className="text-xs text-gray-500">
            {item.city}, {item.country}
          </p>
        </div>
      </div>
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        const selectedOption = data?.find(
          (branch) => branch.name === optionValue,
        );
        setInputValue(optionValue);
        field.onChange(selectedOption?.id);
        selectedOption && onSelect?.(selectedOption.timeZone);
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
      styles={{
        dropdown: {
          borderRadius: "8px",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Combobox.Target>
        <TextInput
          radius="md"
          label={label}
          placeholder={placeholder}
          value={inputValue}
          ref={field.ref}
          onChange={(event) => {
            setInputValue(event.currentTarget.value);
            combobox.resetSelectedOption();
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            field.onBlur();
          }}
          error={fieldState.error?.message}
          leftSection={<IconSearch size={16} stroke={1.5} />}
          rightSection={
            (isLoading && <Loader size={18} />) ||
            (debouncedValue !== "" && (
              <CloseButton
                size="sm"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  setInputValue("");
                  field.onChange("");
                }}
                aria-label="Clear value"
              />
            ))
          }
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={debouncedValue.length === 0}>
        <Combobox.Options>
          {data?.length === 0 ? (
            <Combobox.Empty>
              {t("searchForm.locationNotFound", {
                ns: "common",
              })}
            </Combobox.Empty>
          ) : (
            options
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default BranchAutocomplete;
