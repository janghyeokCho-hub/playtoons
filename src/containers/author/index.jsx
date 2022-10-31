import React, { useCallback, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import List from "./List";
import Post from "./Post";
import Register from "./Register";
import RegisterForm from "./RegisterForm";
import Store from "./Store";
import Detail from "./Detail";
import { setHeader } from "@/modules/redux/ducks/container";

const App = () => {
  const dispatch = useDispatch();

  const handleContainer = useCallback(() => {
    const header = {
      headerClass: "header",
      containerClass: "container dashboard author",
      isHeaderShow: true,
      isMenuShow: true,
      headerType: "",
      menuType: "MAIN",
      isDetailView: false,
    };
    dispatch(setHeader(header));
  }, [dispatch]);

  useEffect(() => {
    handleContainer();
  }, []);
  return (
    <Routes>
      <Route path="store" element={<Store />} />
      <Route path="list" element={<List />} />
      <Route path="post/:id" element={<Post />} />
      <Route path="register" element={<Register />} />
      <Route path="register/form" element={<RegisterForm />} />
      <Route path="detail/:type/:id" element={<Detail />} />
    </Routes>
  );
};

export default App;
