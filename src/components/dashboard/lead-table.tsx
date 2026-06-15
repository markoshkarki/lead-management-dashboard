import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Pencil, Trash2, Inbox } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DeleteLeadDialog } from "./delete-lead-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Lead } from "@/types/lead";

interface LeadTableProps {
  leads: Lead[];
  onEditLead: (lead: Lead) => void;
  onDeleteLead: (id: string) => void;
  onStatusChange: (id: string, status: Lead["status"]) => void;
}

export function LeadTable({
  leads,
  onEditLead,
  onDeleteLead,
  onStatusChange,
}: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-16">
        <div className="flex flex-col items-center text-center">
          <Inbox className="mb-5 h-14 w-14 text-muted-foreground" />

          <h3 className="text-xl font-semibold">No leads found</h3>

          <p className="mt-2 text-muted-foreground">
            Try changing your search term or status filter.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold">
                    {lead.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <p className="font-medium">{lead.name}</p>

                    <p className="text-xs text-muted-foreground">Lead</p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <p className="font-medium">{lead.company}</p>

                  <p className="text-xs text-muted-foreground">Organization</p>
                </div>
              </TableCell>

              <TableCell>{lead.email}</TableCell>
              <TableCell>
                <span className="font-mono">{lead.phone}</span>
              </TableCell>

              <TableCell>
                <Select
                  value={lead.status}
                  onValueChange={(value) =>
                    onStatusChange(lead.id, value as Lead["status"])
                  }
                >
                  <SelectTrigger
                    className={`w-[140px]
      ${lead.status === "New" ? "border-blue-200 bg-blue-50 text-blue-700" : ""}
      ${
        lead.status === "Contacted"
          ? "border-yellow-200 bg-yellow-50 text-yellow-700"
          : ""
      }
      ${
        lead.status === "Qualified"
          ? "border-purple-200 bg-purple-50 text-purple-700"
          : ""
      }
      ${
        lead.status === "Converted"
          ? "border-green-200 bg-green-50 text-green-700"
          : ""
      }
      ${lead.status === "Lost" ? "border-red-200 bg-red-50 text-red-700" : ""}
    `}
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>

                    <SelectItem value="Contacted">Contacted</SelectItem>

                    <SelectItem value="Qualified">Qualified</SelectItem>

                    <SelectItem value="Converted">Converted</SelectItem>

                    <SelectItem value="Lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>{lead.createdAt}</TableCell>

              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditLead(lead)}
                  >
                    <Pencil className="mr-1 h-4 w-4" />
                    Edit
                  </Button>

                  <DeleteLeadDialog
                    leadName={lead.name}
                    onDelete={() => onDeleteLead(lead.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
