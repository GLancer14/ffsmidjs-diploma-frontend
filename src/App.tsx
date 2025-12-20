import { Route, Routes } from 'react-router';
import './assets/scss/index.scss';
import { MainLayout } from './components/Main';
import { FindBookLayout } from './components/FindBook';
import { BookRentLayout } from './components/BookRent';
import { useAppDispatch } from './hooks/reduxHook';
import { useEffect } from 'react';
import { updateCurrentUser } from './store/reducers/userSlice';
import { getLoggedUser } from './api/auth';
import { BookRent } from './components/BookRent/BookRent/BookRent';
import { RentOrder } from './components/BookRent/RentOrder/RentOrder';
import { ProfileLayout } from './components/Profile';
import { Welcome } from './components/Profile/Welcome/Welcome';
import { Settings } from './components/Profile/Settings/Settings';
import { Users } from './components/Profile/Users/Users';
import { AnotherUserProfile } from './components/Profile/AnotherUserProfile/AnotherUserProfile';

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
        <Route path='find-book' element={<FindBookLayout />} />
        <Route path='rent-book' element={<BookRentLayout />}>
          <Route path=':title/:author' element={<BookRent />} />
          <Route path='result/:id' element={<RentOrder />} />
        </Route>
        <Route path="/profile" element={<ProfileLayout />}>
          <Route index element={<Welcome /> } />
          <Route path={"settings"} element={<Settings /> } />
          <Route path={"users"}>
            <Route index element={<Users /> } />
            <Route path={":id"} element={<AnotherUserProfile /> } />
          </Route>
          <Route path={"libraries"} element={<Settings /> } />
          <Route path={"books"} element={<Settings /> } />
        </Route>
      </Routes>
    </>
  )
}

export default App;
