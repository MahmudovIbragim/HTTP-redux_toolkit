import scss from "./Header.module.scss";
import youtube from "../../../assets/youtube.png";

const Header = () => {
  return (
    <div className={scss.Header}>
      <nav>
        <ul>
          <li>
            <img src={youtube} alt="" />
            YouTube
          </li>
        </ul>
      </nav>
      <div className="container">
        <div className={scss.Content}>
          <div className={scss.form}></div>
          <div className={scss.icons}></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
