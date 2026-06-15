"use client";

import { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Lead, LeadStatus } from "@/types/lead";

interface Props {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
  onSave: (lead: Lead) => void;
}

export function EditLeadSheet({ lead, open, onClose, onSave }: Props) {
  const [form, setForm] = useState<Lead | null>(null);

  useEffect(() => {
    setForm(lead);
  }, [lead]);

  if (!form) return null;

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit Lead</SheetTitle>
        </SheetHeader>

        <div className="mt-8 px-4 space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">Full Name</label>

            <Input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Company</label>

            <Input
              value={form.company}
              onChange={(e) =>
                setForm({
                  ...form,
                  company: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>

            <Input
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Phone Number
            </label>

            <Input
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
            />
          </div>
          {/* 
          <div>
            <label className="mb-2 block text-sm font-medium">
              Lead Status
            </label>

            <Select
              value={form.status}
              onValueChange={(value) =>
                setForm({
                  ...form,
                  status: value as LeadStatus,
                })
              }
            >
              <SelectTrigger>
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
          </div> */}

          <div className="border-t pt-5">
            <Button className="w-full" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
