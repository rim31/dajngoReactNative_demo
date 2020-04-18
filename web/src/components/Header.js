import React from 'react';


const Header = (props) => {
  return (
    <div>
      <nav className="navbar is-transparent">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="https://avatars2.githubusercontent.com/u/13416701?s=460&u=bf99767c13093f7222c9a625a1c9b882b0d479b5&v=4" alt="Bulma: a modern CSS framework based on Flexbox" />
            <h1 className="title">WAT-R-U</h1>
          </a>
          <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div className="container is-fullhd">
        <div className="notification">
          <div className="site-layout-content">

            {props.children}

          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Bulma</strong>
          </p>
        </div>
      </footer>
    </div>
  );
}
export default Header;
