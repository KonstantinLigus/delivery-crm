import { LoginAndRegisterPage } from 'pages/LoginAndRegisterPage/LoginAndRegisterPage';
import { Menu } from 'pages/Menu/Menu';
import { UserPage } from 'pages/UserPage/UserPage';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Menu />}>
        <Route index element={<LoginAndRegisterPage />} />
        <Route path="user" element={<UserPage />} />
      </Route>
    </Routes>
  );
};
