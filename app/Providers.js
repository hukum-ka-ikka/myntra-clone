"use-client";

import { Provider } from "react-redux";
import store from "./redux/store.js";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <SessionProvider>{children}</SessionProvider>
    </Provider>
  );
};

export default Providers;
