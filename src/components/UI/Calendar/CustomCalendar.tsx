import "./customCalendar.scss";
import Calendar from "react-calendar";

export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
export interface CustomCalendarInterface {
  value: Value;
  onChange: React.Dispatch<React.SetStateAction<Value>>;
}

export function CustomCalendar({ value, onChange }: CustomCalendarInterface) {
  const NextMonthBtn = (
    <button className="next-month-btn" type="button"></button>
  );

  const PrevMonthBtn = (
    <button className="prev-month-btn" type="button"></button>
  );

  return (
    <div className="custom-calendar">
      <div className="custom-calendar_header">
        {value?.toLocaleString("ru-RU", {
          weekday: "short",
          day: "numeric",
          month: "long",
        })}
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


