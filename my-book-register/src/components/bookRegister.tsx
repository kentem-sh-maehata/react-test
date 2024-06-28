import { useState } from 'react';
import { BookItemModel } from '../models';
import LabelInput from './labelInput';

type BookRegisterProps = {
  onPostCompleted: (postedItem: Omit<BookItemModel, 'id'>) => void;
};
const BookRegister = ({ onPostCompleted }: BookRegisterProps) => {
  const [isbn, setIsbn] = useState('');
  const handleClickButton = (): void => {
    // ISBNコードが空白の際は登録できないようにする
    if (!isbn) {
      alert('ISBNコードを入力してください');
      return;
    }

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
    setIsbn(''); //登録を押したらインプットをクリア
  };
  const onChangeIsbn = (isbn: string): void => {
    // 数値以外を入力できないようにする
    isbn = isbn.replace(/[^0-9]/g, '');
    setIsbn(isbn);
  };

  return (
    <div className="book-register">
      <LabelInput label="ISBNコード" isbn={isbn} onChangeIsbn={onChangeIsbn} />
      <button className="button" onClick={handleClickButton}>
        書籍登録
      </button>
    </div>
  );
};

export default BookRegister;
