type LabelInputProps = {
  isbn: string;
  onChangeIsbn: (isbn: string) => void;
};
const LabelInput = ({ isbn, onChangeIsbn }: LabelInputProps) => {
  return (
    <div className="label-input">
      <label className="label">ISBNコード</label>
      <input
        className="input"
        placeholder="入力してください"
        value={isbn}
        onChange={(e) => onChangeIsbn(e.target.value)}
      ></input>
    </div>
  );
};

export default LabelInput;
