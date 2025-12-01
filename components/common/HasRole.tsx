import { User } from "@/types/model";
import { ROLE } from "@/constants/constant";
import { ReactNode } from "react";

interface HasRoleProps {
  user: User | null;
  role: ROLE;
  children: ReactNode | ReactNode[]
}

const HasRole = ({
  user,
  role,
  children
}: HasRoleProps) => {

  if (!user || user.role.name !== role) {
    return null;
  }

  return children
};

export const HasAdmin = (props: Omit<HasRoleProps, 'role'>) => <HasRole {...props} role={ROLE.SUPER_ADMIN} />

export const HasRecruiter = (props: Omit<HasRoleProps, 'role'>) => <HasRole {...props} role={ROLE.SUPER_ADMIN} />



