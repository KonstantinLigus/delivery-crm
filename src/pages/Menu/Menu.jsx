import css from './Menu.module.css';
const { Link, Outlet } = require('react-router-dom');

export const Menu = () => {
  return (
    <div className={css.menuContainer}>
      <div>
        <Link to="/" className={css.menuLink}>
          Autorization
        </Link>
        <Link to="user" className={css.menuLink}>
          User
        </Link>
      </div>
      <div className={css.outlet}>
        <Outlet />
      </div>
    </div>
  );
};
