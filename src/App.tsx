import { createContext, useReducer } from "react";
import "./App.css";
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import { user, userReduse } from "./reducer/userReduce";
import LetterAvatars from "./components/login/avatar";
import { myRouter } from "./Router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./store/store";

export const userContext = createContext<{
  user: user | null;
  userDispatch: React.Dispatch<any>;
}>({ user: null, userDispatch: () => { } });

const initialState: user = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  address: "",
  phon: "",
  isConected: false,
};

function App() {
  const [state, userDispatch] = useReducer(userReduse, initialState as user);

  return (
    <Provider store={Store}>
      <userContext.Provider value={{ user: state, userDispatch }}>
        <div className="bg-peach text-gray-900 min-h-screen flex flex-col items-center justify-center p-6">

          <div className="w-full mt-6">
            <RouterProvider router={myRouter} />
          </div>
        </div>
      </userContext.Provider>
    </Provider>
  );
}

export default App;
