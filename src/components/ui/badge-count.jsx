import { cn } from "@/lib/utils";

interface BadgeCountProps {
  count: number;
  className?: string;
}

export const BadgeCount = ({ count, className }: BadgeCountProps) => {
  return (
    <span className={cn(
      "inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-white bg-blue-500 rounded-full",
      className
    )}>
      {count}
    </span>
  );
};