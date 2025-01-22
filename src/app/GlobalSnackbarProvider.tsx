"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { HttpStatusCode } from "axios";

type SnackbarMessage = {
  message: string;
  severity?: AlertColor; // 'success' | 'error' | 'warning' | 'info'
  status?: HttpStatusCode;
  errors?:
    | { error: string; message: string }[]
    | { error: string; message: string };
};

interface GlobalSnackbarContextProps {
  showMessage: (msg: SnackbarMessage) => void;
}

const GlobalSnackbarContext = createContext<GlobalSnackbarContextProps | null>(
  null
);

export default function GlobalSnackbarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [snackbarData, setSnackbarData] = useState<SnackbarMessage | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const showMessage = (msg: SnackbarMessage) => {
    setSnackbarData(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSnackbarData(null);
  };

  return (
    <GlobalSnackbarContext.Provider value={{ showMessage }}>
      {children}

      {/* 실제 스낵바 렌더링 */}
      {snackbarData && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={snackbarData.severity || "info"}
            sx={{ width: "100%" }}
          >
            <p>{snackbarData.message}</p>
            {snackbarData.status && <p> status : {snackbarData.status}</p>}
            {Array.isArray(snackbarData.errors)
              ? snackbarData.errors?.map((error, index) => (
                  <div key={index}>
                    <p>
                      error{index + 1} - {error.error} : {error.message}
                    </p>
                  </div>
                ))
              : snackbarData.errors && (
                  <div>
                    <p>
                      {snackbarData.errors.error} :{snackbarData.errors.message}
                    </p>
                  </div>
                )}
          </Alert>
        </Snackbar>
      )}
    </GlobalSnackbarContext.Provider>
  );
}

export const useGlobalSnackbar = () => {
  const context = useContext(GlobalSnackbarContext);
  if (!context) {
    throw new Error(
      "useGlobalSnackbar must be used within a GlobalSnackbarProvider"
    );
  }
  return context;
};
