"use client";

import { useEffect, useMemo, useState } from "react";

import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { LeadTable } from "@/components/dashboard/lead-table";
import { AddLeadDialog } from "@/components/dashboard/add-lead-dialog";
import { EditLeadSheet } from "@/components/dashboard/edit-lead-sheet";

import { mockLeads } from "@/data/mockLeads";
import { Lead } from "@/types/lead";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const storedLeads = localStorage.getItem("leads");

    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    } else {
      setLeads(mockLeads);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("leads", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const handleAddLead = (lead: Lead) => {
    setLeads((prev) => [lead, ...prev]);

    toast.success(`${lead.name} added successfully`);
  };

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead);
  };

  const handleSaveLead = (updatedLead: Lead) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)),
    );

    toast.success(`${updatedLead.name} updated successfully`);
  };

  const handleDeleteLead = (id: string) => {
    const lead = leads.find((lead) => lead.id === id);

    setLeads((prev) => prev.filter((lead) => lead.id !== id));

    toast.success(`${lead?.name ?? "Lead"} deleted`);
  };

  const handleStatusChange = (id: string, status: Lead["status"]) => {
    const lead = leads.find((lead) => lead.id === id);

    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
    );

    toast.success(`${lead?.name ?? "Lead"} status updated to ${status}`);
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const totalPages = Math.ceil(filteredLeads.length / ITEMS_PER_PAGE);

  const paginatedLeads = filteredLeads.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">
            Lead Management Dashboard
          </h1>

          <p className="text-muted-foreground">
            Track customer leads, sales opportunities, and conversion progress.
          </p>
        </div>

        <DashboardStats leads={leads} />

        <div className="flex justify-end">
          <AddLeadDialog onAddLead={handleAddLead} />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            placeholder="Search by name or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="All">All Statuses</SelectItem>

              <SelectItem value="New">New</SelectItem>

              <SelectItem value="Contacted">Contacted</SelectItem>

              <SelectItem value="Qualified">Qualified</SelectItem>

              <SelectItem value="Converted">Converted</SelectItem>

              <SelectItem value="Lost">Lost</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <LeadTable
          leads={paginatedLeads}
          onEditLead={handleEditLead}
          onDeleteLead={handleDeleteLead}
          onStatusChange={handleStatusChange}
        />

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            {filteredLeads.length === 0
              ? 0
              : (currentPage - 1) * ITEMS_PER_PAGE + 1}
            -{Math.min(currentPage * ITEMS_PER_PAGE, filteredLeads.length)} of{" "}
            {filteredLeads.length} leads
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </Button>

            <Button
              variant="outline"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>

        <EditLeadSheet
          lead={editingLead}
          open={!!editingLead}
          onClose={() => setEditingLead(null)}
          onSave={handleSaveLead}
        />
      </div>
    </main>
  );
}
