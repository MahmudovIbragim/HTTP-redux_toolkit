import HomePage from "../pages/homePage/HomePage";
import scss from "./Layout.module.scss";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const Layout = () => {
  return (
    <div className={scss.Layout}>
      <Header />
      <div className="container">
        <div className={scss.Content}>
          <main>
            <HomePage />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
