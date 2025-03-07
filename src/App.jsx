import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./Routes/AppRoutes";
import { UserProvider } from "./context/user.context";
import {Toaster} from 'react-hot-toast';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AppRoutes />
        <Toaster position="top-center"/>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
