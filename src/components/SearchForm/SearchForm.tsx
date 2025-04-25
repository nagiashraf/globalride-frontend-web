import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Select } from "@mantine/core";
import BranchAutocomplete from "./BranchAutocomplete";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import i18n from "@/i18n/i18n";
import { useTranslation } from "react-i18next";
import { RefObject, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import timezone from "dayjs/plugin/timezone";
import { useNavigate } from "react-router";

dayjs.extend(objectSupport);
dayjs.extend(timezone);

type Props = {
  searchFormRef?: RefObject<HTMLFormElement>;
};

const times = new Map(
  Array.from({ length: 24 }, (_, i) => i)
    .flatMap((hour) => [
      dayjs({ hour: hour, minute: 0 }),
      dayjs({ hour: hour, minute: 30 }),
    ])
    .map((time) => [time.format("hh:mm A"), time]),
);

const SearchForm = ({ searchFormRef }: Props) => {
  const { t } = useTranslation(["common"]);

  const navigate = useNavigate();

  const formSchema = z
    .object({
      pickupLocation: z
        .string()
        .min(
          1,
          t("searchForm.validation_pickupLocationRequired", { ns: "common" }),
        ),
      dropoffLocation: z.string().optional(),
      pickupDate: z
        .custom<Dayjs>(
          (val) => val instanceof dayjs,
          t("searchForm.validation_invalidDate", { ns: "common" }),
        )
        .refine(
          (val) => val.isAfter(dayjs()),
          t("searchForm.validation_pickupDateFuture", { ns: "common" }),
        ),
      pickupTime: z.custom<Dayjs>(
        (val) => val instanceof dayjs,
        t("searchForm.validation_invalidTime", { ns: "common" }),
      ),
      dropoffDate: z
        .custom<Dayjs>(
          (val) => val instanceof dayjs,
          t("searchForm.validation_invalidDate", { ns: "common" }),
        )
        .refine(
          (val) => val.isAfter(dayjs()),
          t("searchForm.validation_dropoffDateFuture", { ns: "common" }),
        ),
      dropoffTime: z.custom<Dayjs>(
        (val) => val instanceof dayjs,
        t("searchForm.validation_invalidTime", { ns: "common" }),
      ),
    })
    .refine(
      (data) =>
        data.dropoffDate
          .hour(data.dropoffTime.hour())
          .minute(data.dropoffTime.minute())
          .isAfter(
            data.pickupDate
              .hour(data.pickupTime.hour())
              .minute(data.pickupTime.minute()),
          ),
      {
        message: t("searchForm.validation_dropoffDateAfterPickup", {
          ns: "common",
        }),
        path: ["dropoffDate"],
      },
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupLocation: "",
      dropoffLocation: "",
      pickupDate: dayjs().add(5, "day"),
      pickupTime: times.get("10:00 AM"),
      dropoffDate: dayjs().add(8, "day"),
      dropoffTime: times.get("10:00 AM"),
    },
  });

  const pickupLocationTimeZone = useRef("");
  const dropoffLocationTimeZone = useRef("");

  const handlePickupLocationChange = (value: string) => {
    pickupLocationTimeZone.current = value;
  };

  const handleDropoffLocationChange = (value: string) => {
    dropoffLocationTimeZone.current = value;
  };

  const [showDropoffLocation, setShowDropoffLocation] = useState(false);

  const pickupLocation = form.watch("pickupLocation");
  const pickupDate = form.watch("pickupDate");

  const minPickupDate = pickupLocation
    ? new Date(
        dayjs().tz(pickupLocationTimeZone.current).valueOf() +
          dayjs().tz(pickupLocationTimeZone.current).utcOffset() * 60 * 1000,
      )
    : new Date();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const pickupDate = values.pickupDate
      .hour(form.getValues("pickupTime").hour())
      .minute(form.getValues("pickupTime").minute())
      .tz(pickupLocationTimeZone.current, true)
      .toISOString();

    const dropoffBranchTimeZone = values.dropoffLocation
      ? dropoffLocationTimeZone.current
      : pickupLocationTimeZone.current;
    const dropoffDate = values.dropoffDate
      .hour(form.getValues("dropoffTime").hour())
      .minute(form.getValues("dropoffTime").minute())
      .tz(dropoffBranchTimeZone, true)
      .toISOString();

    navigate(
      `/car-search-results?\
pickupBranch=${values.pickupLocation}&\
dropoffBranch=${values.dropoffLocation}&\
pickupDate=${pickupDate}&\
dropoffDate=${dropoffDate}`,
    );
  }

  return (
    <div className="flex flex-col-reverse gap-4 xl:flex-col">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        ref={searchFormRef}
        className="grid xl:grid-cols-[1fr_300px_300px_150px] gap-1 p-4 pb-4 rounded-lg bg-light shadow-lg"
      >
        <div className="flex gap-1 flex-col xl:flex-row">
          <div className="grow">
            <BranchAutocomplete
              control={form.control}
              name="pickupLocation"
              label={t("searchForm.pickupLocationLabel")}
              placeholder={t("searchForm.pickupLocationPlaceholder")}
              onSelect={handlePickupLocationChange}
            />
          </div>
          <div className={`grow ${!showDropoffLocation && "hidden"}`}>
            <BranchAutocomplete
              control={form.control}
              name="dropoffLocation"
              label={t("searchForm.dropoffLocationLabel")}
              placeholder={t("searchForm.dropoffLocationPlaceholder")}
              onSelect={handleDropoffLocationChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-[3fr_2fr] gap-1">
          <Controller
            control={form.control}
            name="pickupDate"
            render={({ field, fieldState }) => (
              <DatePickerInput
                value={dayjs(field.value).toDate()}
                onChange={(val) => field.onChange(dayjs(val))}
                onBlur={field.onBlur}
                ref={field.ref}
                error={fieldState.error?.message}
                leftSection={<IconCalendar size={16} stroke={1.5} />}
                label={t("searchForm.pickupDateLabel")}
                placeholder={t("searchForm.pickupDatePlaceholder")}
                hideOutsideDates
                locale={i18n.resolvedLanguage}
                weekendDays={[]}
                minDate={minPickupDate}
                maxDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                }
                valueFormat="ddd DD MMM"
                radius="md"
              />
            )}
          />
          <Controller
            control={form.control}
            name="pickupTime"
            render={({ field }) => (
              <Select
                value={field.value.format("hh:mm A")}
                onChange={(val) => field.onChange(times.get(val as string))}
                onBlur={field.onBlur}
                ref={field.ref}
                label={t("searchForm.timeLabel")}
                placeholder={t("searchForm.timePlaceholder")}
                leftSection={<IconClock size={16} stroke={1.5} />}
                rightSectionWidth={0}
                checkIconPosition="right"
                data={Array.from(times.keys())}
                radius="md"
              />
            )}
          />
        </div>

        <div className="grid grid-cols-[3fr_2fr] gap-1">
          <Controller
            control={form.control}
            name="dropoffDate"
            render={({ field, fieldState }) => (
              <DatePickerInput
                value={dayjs(field.value).toDate()}
                onChange={(val) => field.onChange(dayjs(val))}
                onBlur={field.onBlur}
                ref={field.ref}
                error={fieldState.error?.message}
                leftSection={<IconCalendar size={16} stroke={1.5} />}
                label={t("searchForm.dropoffDateLabel")}
                placeholder={t("searchForm.dropoffDatePlaceholder")}
                hideOutsideDates
                locale={i18n.resolvedLanguage}
                weekendDays={[]}
                minDate={dayjs(pickupDate).toDate() || new Date()}
                maxDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                }
                valueFormat="ddd DD MMM"
                radius="md"
              />
            )}
          />
          <Controller
            control={form.control}
            name="dropoffTime"
            render={({ field }) => (
              <Select
                value={field.value.format("hh:mm A")}
                onChange={(val) => field.onChange(times.get(val as string))}
                onBlur={field.onBlur}
                ref={field.ref}
                label={t("searchForm.timeLabel")}
                placeholder={t("searchForm.timePlaceholder")}
                leftSection={<IconClock size={16} stroke={1.5} />}
                rightSectionWidth={0}
                checkIconPosition="right"
                data={Array.from(times.keys())}
                radius="md"
              />
            )}
          />
        </div>

        <Button
          type="submit"
          radius="md"
          fz={"lg"}
          // loading={isLoading}
          className="self-end xl:!h-[80%] mt-2 xl:mt-0"
          styles={{
            label: {
              whiteSpace: "normal",
            },
          }}
        >
          {t("searchForm.submitButton")}
        </Button>
      </form>

      <Checkbox
        checked={!showDropoffLocation}
        onChange={(event) => {
          setShowDropoffLocation(!event.currentTarget.checked);
          if (
            !event.currentTarget.checked &&
            form.getValues("pickupLocation")
          ) {
            form.setValue("dropoffLocation", form.getValues("pickupLocation"));
          }
          if (
            event.currentTarget.checked &&
            form.getValues("dropoffLocation")
          ) {
            form.setValue("dropoffLocation", "");
          }
        }}
        label={t("searchForm.returnToTheSameBranchCheckbox")}
        variant="outline"
        size="md"
        radius="md"
      />
    </div>
  );
};

export default SearchForm;
