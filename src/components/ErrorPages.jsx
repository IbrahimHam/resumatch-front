import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <>
      <h1>404 - Page Not Found</h1>

      <Button onClick={() => window.history.back()}>Go Back</Button>
    </>
  );
};

const UnauthorizedPage = () => {
  return (
    <>
      <h1 size="2xl">401 - Unauthorized</h1>

      <p>You don't have permission to access this page.</p>

      <Button onClick={() => window.history.back()}>Go Back</Button>
    </>
  );
};

export { NotFoundPage, UnauthorizedPage };
