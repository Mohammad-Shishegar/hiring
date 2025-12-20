import { useAuth } from "../contexts/AuthContext";

const permissionList = ["ADMIN", "REPORT", "EDIT"] as const;

type Permission = (typeof permissionList)[number];

interface IPermissionGate {
  children: React.ReactNode;
  permissions: Permission[];
}

interface IPermissionGateFunction {
  permissions: Permission[];
}

const PermissionGate = ({ children, permissions }: IPermissionGate) => {
  const authData = useAuth();

  const hasAccess = authData?.userData?.access?.some((item: any) =>
    permissions?.includes(item)
  );

  if (hasAccess) return children;
  else return null;
};

const permissionGateFunction = (permissions: Permission[]) => {
  const authData = useAuth();
  const hasAccess = authData?.userData?.access?.some((item: any) =>
    permissions?.includes(item)
  );

  if (hasAccess) return true;
  else return false;
};

export { PermissionGate, permissionGateFunction };
