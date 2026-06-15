"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Lead, LeadStatus } from "@/types/lead";

interface Props {
  onAddLead: (lead: Lead) => void;
}

export function AddLeadDialog({ onAddLead }: Props) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [status, setStatus] = useState<LeadStatus>("New");

  const resetForm = () => {
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setStatus("New");
  };

  const handleSubmit = () => {
    if (!name.trim() || !company.trim()) return;

    const newLead: Lead = {
      id: crypto.randomUUID(),
      name,
      company,
      email,
      phone,
      status,
      createdAt: new Date().toISOString().split("T")[0],
    };

    onAddLead(newLead);

    resetForm();

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ Add Lead</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Select
            value={status}
            onValueChange={(value) => setStatus(value as LeadStatus)}
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

          <Button className="w-full" onClick={handleSubmit}>
            Create Lead
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
