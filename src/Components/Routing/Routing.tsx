import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Error from "../Page/Error/Error";
import Home from "../Page/Home/Home";
import Showcase from "../Page/Showcase/Showcase";

// type Props = {
//     children:
// };

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" caseSensitive={false} element={<Home />} />
        <Route path="/home" caseSensitive={false} element={<Home />} />

        <Route path="/showcase" caseSensitive={false} element={<Showcase />} />
        <Route path="*" caseSensitive={false} element={<Error />} />
      </Routes>
    </Router>
  );
};

export default Routing;
