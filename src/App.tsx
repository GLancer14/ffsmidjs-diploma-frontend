import { Route, Routes, useNavigate } from 'react-router';
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
import { Libraries } from './components/Profile/Libraries/Libraries';
import { LibraryProfile } from './components/Profile/LibraryProfile/LibraryProfile';
import { ManagerBooks } from './components/Profile/ManagerBooks/ManagerBooks';
import { MyBooks } from './components/Profile/MyBooks/MyBooks';
import { NotFound } from './components/404/NotFound';

function App() {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  async function getUserFromSession() {
    const user = await getLoggedUser();
    if (user.status) {
      console.log(user)
      navigation("/");
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
          <Route path={"libraries"}>
            <Route index element={<Libraries /> } />
            <Route path={":id"} element={<LibraryProfile /> } />
          </Route>
          <Route  path={"books"}>
            <Route index element={<ManagerBooks /> } />
            <Route path={":id"} element={<LibraryProfile /> } />
          </Route>
          <Route path={"books"} element={<Settings /> } />
          <Route path={"my-books"} element={<MyBooks /> } />
        </Route>
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App;
