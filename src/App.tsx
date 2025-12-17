import { Route, Routes } from 'react-router';
import './assets/scss/index.scss';
import { Header } from './components/Header/Header';
import { FindBook } from './components/FindBook/FindBook';
import { EditorsChoice } from './components/Main/EditorsChoice/EditorsChoice';
import { MainLayout } from './components/Main';
import { FindBookLayout } from './components/FindBook';
import { BookRent } from './components/BookRent/BookRent/BookRent';
import { BookRentLayout } from './components/BookRent';
import { useAppDispatch } from './hooks/reduxHook';
import { useEffect } from 'react';
import { updateCurrentUser } from './store/reducers/userSlice';
import { getLoggedUser } from './api/auth';

function App() {
  const dispatch = useAppDispatch();

  async function getUserFromSession() {
    const user = await getLoggedUser();
    if (user.status) {
      return;
    }

    dispatch(updateCurrentUser(user));
  }
  
  useEffect(() => {
    getUserFromSession();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path='/find-book' element={<FindBookLayout />} />
        <Route path='/rent-book/:title/:author' element={<BookRentLayout />} />
        <Route path="/profile" />
      </Routes>
    </>
  )
}

export default App;
