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

import {
  UtensilsCrossed,
  ShoppingBasket,
  Coffee,
  Sandwich,
  Cookie,
  GlassWater,
  Bus,
  Fuel,
  Car,
  Bike,
  PlaneTakeoff,
  Home,
  Zap,
  Droplets,
  Wifi,
  Sofa,
  GraduationCap,
  BookOpen,
  PenLine,
  Printer,
  MonitorPlay,
  Library,
  Shirt,
  Footprints,
  Scissors,
  Sparkles,
  WashingMachine,
  Stethoscope,
  Pill,
  Dumbbell,
  Brain,
  HeartPulse,
  Smartphone,
  Cpu,
  CreditCard,
  Headphones,
  Tv,
  Ticket,
  Gamepad2,
  Music,
  Palette,
  Clapperboard,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Landmark,
  Wallet,
  Church,
  HandHeart,
  Gift,
  PawPrint,
  LayoutGrid,
  Tag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  UtensilsCrossed,
  ShoppingBasket,
  Coffee,
  Sandwich,
  Cookie,
  GlassWater,
  Bus,
  Fuel,
  Car,
  Bike,
  PlaneTakeoff,
  Home,
  Zap,
  Droplets,
  Wifi,
  Sofa,
  GraduationCap,
  BookOpen,
  PenLine,
  Printer,
  MonitorPlay,
  Library,
  Shirt,
  Footprints,
  Scissors,
  Sparkles,
  WashingMachine,
  Stethoscope,
  Pill,
  Dumbbell,
  Brain,
  HeartPulse,
  Smartphone,
  Cpu,
  CreditCard,
  Headphones,
  Tv,
  Ticket,
  Gamepad2,
  Music,
  Palette,
  Clapperboard,
  PiggyBank,
  ShieldCheck,
  TrendingUp,
  Landmark,
  Wallet,
  Church,
  HandHeart,
  Gift,
  PawPrint,
  LayoutGrid,
  Tag,
};
