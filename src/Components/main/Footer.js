import React from "react";

function Footer(props) {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            {new Date().getFullYear()} © Shoperola.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
