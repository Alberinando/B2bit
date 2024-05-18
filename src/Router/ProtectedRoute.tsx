import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  user,
  element,
}: {
  user: string | null | undefined;
  element: React.ReactNode;
    }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export { ProtectedRoute };
