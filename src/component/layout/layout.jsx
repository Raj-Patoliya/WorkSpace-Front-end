import React from "react";
import Header from "./header";
const Layout = (props) => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <div
          style={{
            marginTop: "4.0rem",
            // backgroundColor: "#eee5fd",
          }}
        >
          {props.children}
        </div>
      </main>
    </React.Fragment>
  );
};

export default Layout;
