import { Badge } from "@/components/ui/badge";
import { LeadStatus } from "@/types/lead";

interface Props {
  status: LeadStatus;
}

export function StatusBadge({ status }: Props) {
  const variants: Record<LeadStatus, string> = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-yellow-100 text-yellow-700",
    Qualified: "bg-purple-100 text-purple-700",
    Converted: "bg-green-100 text-green-700",
    Lost: "bg-red-100 text-red-700",
  };

  return (
    <Badge className={variants[status]}>
      {status}
    </Badge>
  );
}