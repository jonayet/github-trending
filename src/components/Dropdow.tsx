interface DropdownProps {
  label: string;
  className?: string;
  keyLabelPairs: Record<string, string>;
  onChange: (key: string) => void;
}

export const Dropdown = (props: DropdownProps) => {
  const handleOnChane = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.stopPropagation();
    props.onChange(event.target.value);
  };
  return (
    <div className={props.className}>
      <label htmlFor={props.label}>{`${props.label}: `}</label>
      <select name={props.label} onChange={handleOnChane}>
        {Object.entries(props.keyLabelPairs).map(([key, label], idx) => (
          <option key={idx} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
