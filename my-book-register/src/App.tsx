import { useState } from 'react';
import './App.css';
import FilterableBookTable from './components/filterableBookTable';
import { BookItemModel } from './models';
import BookRegister from './components/bookRegister';

function App() {
  const [books, setBooks] = useState<BookItemModel[]>([]);

  const onPostCompleted = (postedItem: Omit<BookItemModel, 'id'>): void => {
    // 本の登録を重複できないようにする
    if (books.some((book) => book.name === postedItem.name)) {
      alert('その本は既に追加されています');
      return;
    }
    setBooks((prev) => [
      ...prev,
      {
        id: new Date().toString(),
        ...postedItem,
      },
    ]);
  };

  return (
    <div className="App">
      {/* 第1問：コンポーネントに分割 ↓ ↓ ↓ ↓ ↓ */}
      <BookRegister onPostCompleted={onPostCompleted} />
      {/* 第1問：コンポーネントに分割 ↑ ↑ ↑ ↑ ↑ ↑ */}
      <hr />
      <FilterableBookTable
        books={books}
        onClickDelete={(id) => {
          {
            /* 第2問：貸出 or 返却 or 削除の処理を追加 */
            setBooks((prev) => {
              return prev.filter((book) => book.id !== id);
            });
          }
        }}
        onClickLendingSwitch={(id) => {
          {
            /* 第2問：貸出 or 返却 or 削除の処理を追加 */
            setBooks((prev) => {
              return prev.map((book) => {
                if (book.id !== id) return book;
                return {
                  ...book,
                  isOnLoan: !book.isOnLoan,
                };
              });
            });
          }
        }}
      />
    </div>
  );
}

export default App;
