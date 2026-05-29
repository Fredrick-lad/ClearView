import {
  LayoutDashboard,
  BanknoteArrowUp,
  BanknoteArrowDown,
  ClipboardList,
  Mail,
  MoveRight,
  MoveLeft,
} from "lucide-react";
import type { Icons } from "../../types";

const IconMap: Record<
  Icons,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  dashboard: LayoutDashboard,
  envelope: Mail,
  income: BanknoteArrowUp,
  expenses: BanknoteArrowDown,
  reports: ClipboardList,
  moveLeft: MoveLeft,
  moveRight: MoveRight,
};

interface iconProps {
  name: Icons;
  className?: string;
  size?: number;
}

export const Icon = ({ name, className, size }: iconProps) => {
  const LucideComponent = IconMap[name];

  if (!LucideComponent) {
    return null;
  }

  return <LucideComponent className={className} size={size} />;
};
