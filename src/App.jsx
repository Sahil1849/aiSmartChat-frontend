import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./Routes/AppRoutes";
import { UserProvider } from "./context/user.context";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <AppRoutes />
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
