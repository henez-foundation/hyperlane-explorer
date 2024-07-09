import { ChangeEvent } from 'react';


interface Props {
  timestamp: number | null;
  onChange: (t: number | null) => void;
  name?: string;
  className?: string;
}

export function DatetimeField({ timestamp, onChange, name, className }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target['validity'].valid) {
      onChange(null);
    } else {
      const datetime = e.target['value'] + ':00Z';
      const newTimestamp = new Date(datetime).getTime();
      onChange(newTimestamp);
    }
  };

  return (
    <input
      type="datetime-local"
      value={toShortIsoString(timestamp)}
      onChange={handleChange}
      name={name}
      className={`${className} -ml-px`}
      style={{ colorScheme: 'dark'}}
    />
  );
}

function toShortIsoString(timestamp: number | null) {
  if (!timestamp) return '';
  // Trim milliseconds and timezone to match input field format
  return new Date(timestamp).toISOString().split('.')[0];
}