import { useId } from 'react';

type LabelInputProps = {
  label: string;
  isbn: string;
  onChangeIsbn: (isbn: string) => void;
};
const LabelInput = ({ label, isbn, onChangeIsbn }: LabelInputProps) => {
  const id = useId();
  return (
    <div className="label-input">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="input"
        placeholder="入力してください"
        value={isbn}
        onChange={(e) => onChangeIsbn(e.target.value)}
      ></input>
    </div>
  );
};

export default LabelInput;
