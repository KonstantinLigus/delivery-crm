import { Route, Routes } from 'react-router-dom';
import { Menu } from 'pages/Menu/Menu';
import { UserPage } from 'pages/UserPage/UserPage';
import { LoginAndRegisterPage } from 'pages/LoginAndRegisterPage/LoginAndRegisterPage';
import { AdminPage } from 'pages/AdminPage/AdminPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />}>
        <Route index element={<LoginAndRegisterPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};
