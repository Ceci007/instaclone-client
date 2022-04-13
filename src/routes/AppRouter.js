import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createMemoryHistory } from 'history';

import Home from "../pages/Home";
import User from "../pages/User";
import Error404 from "../pages/Error404";
import BasicLayout from "../layouts/BasicLayout";

export const history = createMemoryHistory();

export default function AppRouter() {
  return (
    <BrowserRouter>
        <BasicLayout>
            <Routes>
                <Route path="/" element={<Home />} exact={true} />
                <Route path="/:username" element={<User />} exact={true} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BasicLayout>
    </BrowserRouter>
  );
}
