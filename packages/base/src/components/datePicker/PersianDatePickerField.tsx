import { useField, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Calendar, CalendarRef, DateObject } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

interface Props {
  name: string;
  label?: string;
  format?: string;
  hasTime?: boolean;
  onlyMonthPicker?: boolean;
  onlyYearPicker?: boolean;
  placeholder?: string;
  [key: string]: any;
}

export default function PersianDatePickerInputField({
  name,
  label,
  format = "YYYY/MM/DD",
  hasTime = false,
  onlyMonthPicker = false,
  onlyYearPicker = false,
  placeholder = "تاریخ را انتخاب کنید",
  ...rest
}: Props) {
  const { setFieldValue, setFieldTouched } = useFormikContext<any>();
  const [field, meta] = useField<string>(name);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<CalendarRef>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const inputValue = field.value || "";

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (date: DateObject | null) => {
    if (!date) {
      setFieldValue(name, "");
    } else {
      const formatted = date.format(format);
      setFieldValue(name, formatted);
    }
    setOpen(false);
    // mark touched
    setFieldTouched(name, true, false);
  };

  return (
    <div style={{ position: "relative" }} ref={wrapperRef}>
      {label && (
        <label style={{ display: "block", marginBottom: 6, fontSize: 14 }}>
          {label}
        </label>
      )}

      <input
        type="text"
        readOnly
        value={inputValue}
        onClick={handleOpen}
        placeholder={placeholder}
        {...rest}
        style={{
          width: "100%",
          padding: "8px 10px",
          borderRadius: 6,
          border: "1px solid #d1d5db",
          cursor: "pointer",
          boxSizing: "border-box",
        }}
      />

      {meta.touched && meta.error && (
        <div style={{ color: "red", marginTop: 6, fontSize: 12 }}>
          {meta.error as any}
        </div>
      )}

      {/* Popup calendar */}
      {open && (
        <div
          style={{
            position: "absolute",
            zIndex: 9999,
            top: "calc(100% + 6px)",
            left: 0,
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            borderRadius: 8,
            background: "white",
          }}
        >
          <Calendar
            ref={calendarRef}
            calendar={persian}
            locale={persian_fa}
            format={format}
            onlyMonthPicker={onlyMonthPicker}
            onlyYearPicker={onlyYearPicker}
            onChange={handleChange}
            value={inputValue || null}
            plugins={
              hasTime && !onlyMonthPicker && !onlyYearPicker
                ? [<TimePicker position="bottom" />]
                : []
            }
          />
        </div>
      )}
    </div>
  );
}
