import React from "react";
import ReactDOM from "react-dom";

// setup bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

// Import module เนื้อหาที่ 1
// import App from "./c1-component/App";

// Import module เนื้อหาที่ 2
// import App from "./c2-bootstrap/App";

// Import module เนื้อหาที่ 3
// import App from "./c3-route/App";

// Import module เนื้อหาที่ 4
// import App from "./c4-route-auth/App";

// Import module เนื้อหาที่ 5
import App from "./c5-auth-and-todo/App";

ReactDOM.render(<App />, document.getElementById("root"));
