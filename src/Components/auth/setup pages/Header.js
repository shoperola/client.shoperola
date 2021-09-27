import React from "react";

const Header = () => {
  return (
    <div id=" d-inline-block page-topbar">
      <div class="navbar-header container">
        <div class="d-flex">
          <div class="dropdown d-inline-block">
            <img src="assets/images/logo-dark.png" alt="" />
          </div>
        </div>
        <div class="d-flex">
          <div class="navbar-brand-box">
            <a href="index.html" class="logo logo-dark">
              <span class="logo-sm">
                <img src="assets/images/logo-sm.png" alt="" height="50" />
              </span>
              <span class="logo-lg">
                <img src="assets/images/logo-dark.png" alt="" height="20" />
              </span>
            </a>

            <a href="index.html" class="logo logo-light">
              <span class="logo-sm">
                <img src="assets/images/logo-sm.png" alt="" height="40" />
              </span>
              <span class="logo-lg">
                <img src="assets/images/logo-light.png" alt="" height="20" />
              </span>
            </a>
          </div>

          <button
            type="button"
            class="btn btn-sm px-3 font-size-16 header-item waves-effect vertical-menu-btn"
          >
            <i class="fa fa-fw fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
