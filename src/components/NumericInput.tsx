import { useState } from "react";
import styles from "./styles.module.scss";

interface NumericInputProps {
  label: string;
  initialValue?: number
  className?: string;
  onChange: (value: number) => void;
}

export const NumericInput = (props: NumericInputProps) => {
   const [value, setValue] = useState(props.initialValue || 0)
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const val = Number(event.target.value)
    setValue(val)
    props.onChange(val);
  };

  return (
    <div className={props.className}>
      <label htmlFor={props.label}>{props.label}</label>
      <input
        name={props.label}
        className={styles.pageNo}
        type="number"
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};
