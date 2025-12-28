import "./CustomCalendar.scss";
import { X } from "lucide-react";
import Calendar from "react-calendar";

export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
export interface CustomCalendarInterface {
  value: Value;
  visibility: boolean;
  onChange: React.Dispatch<React.SetStateAction<Value>>;
  onVisibilityChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CustomCalendar({
  value,
  visibility,
  onChange,
  onVisibilityChange,
}: CustomCalendarInterface) {
  const NextMonthBtn = (
    <button className="next-month-btn" type="button"></button>
  );

  const PrevMonthBtn = (
    <button className="prev-month-btn" type="button"></button>
  );

  return (
    <div className="custom-calendar" style={{
      display: visibility ? "block" : "none"
    }}>
      <div className="custom-calendar_header">
        {value === null ? (new Date()).toLocaleString("ru-RU", {
            weekday: "short",
            day: "numeric",
            month: "long",
          }) : 
          value?.toLocaleString("ru-RU", {
            weekday: "short",
            day: "numeric",
            month: "long",
          })
        }
        <X
          className="custom-calendar_header_close-btn"
          color={"black"}
          size={18}
          onClick={() => {
            onVisibilityChange(false);
          }}
        />
      </div>
      <Calendar
        className="custom-react-calendar"
        onChange={onChange}
        value={value}
        locale="ru-RU"
        goToRangeStartOnSelect={false}
        minDetail="month"
        prevLabel={PrevMonthBtn}
        nextLabel={NextMonthBtn}
        prev2Label={null}
        next2Label={null}
        formatMonthYear={(locale, date) => {
          return new Intl.DateTimeFormat(
            locale,
            {
              month: "long",
              year: "numeric",
            }
          ).format(date).slice(0, -3);
        }}
      />
    </div>
  );
}


