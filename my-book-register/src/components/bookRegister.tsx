import { useState } from 'react';
import { BookItemModel } from '../models';
import LabelInput from './labelInput';

type BookRegisterProps = {
  onPostCompleted: (postedItem: Omit<BookItemModel, 'id'>) => void;
};
const BookRegister = ({ onPostCompleted }: BookRegisterProps) => {
  const [isbn, setIsbn] = useState('');
  const handleClickButton = (): void => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.totalItems === 0) {
          alert('登録されていない ISBN コードです。');
          return;
        }
        onPostCompleted({
          name: data.items[0].volumeInfo.title,
          isOnLoan: false,
        });
      });
  };
  const onChangeIsbn = (isbn: string): void => setIsbn(isbn);

  return (
    <div className="book-register">
      <LabelInput isbn={isbn} onChangeIsbn={onChangeIsbn} />
      <button className="button" onClick={handleClickButton}>
        書籍登録
      </button>
    </div>
  );
};

export default BookRegister;
