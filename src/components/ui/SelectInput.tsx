import ReactSelect from "react-select";
import type { IOptions } from "../steps/step-2";
interface Props {
  question_text: string;
  options: IOptions[];
  onChange: (answer: string) => void; // `onChange` prop
}

const Select = ({ question_text, options, onChange }: Props) => {
  const optionsData = options?.map((option) => ({
    value: option.option_value,
    label: option.option_text,
  }));

  const handleSelectChange = (selectedOption: any) => {
    onChange(selectedOption.value); // Javobni yuborish
  };

  return (
    <div className="flex flex-col gap-y-2">
      <label className="font-semibold text-[#7D8592]">{question_text}</label>
      <ReactSelect
        options={optionsData}
        onChange={handleSelectChange}
        styles={{
          indicatorSeparator: (base) => {
            return {
              listStyle: "none",
            };
          },
          control(base, props) {
            return {
              ...base,
              color: "red",
              border: "1px solid #D8E0F0",
              borderRadius: "14px",
              display: "flex",
              padding: "6px 12px",
            };
          },
          placeholder(base, props) {
            return {
              ...base,
              color: "#7D8592",
            };
          },
        }}
      />
    </div>
  );
};

export default Select;
