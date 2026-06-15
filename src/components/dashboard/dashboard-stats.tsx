import { Users, UserPlus, Phone, Trophy } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Lead } from "@/types/lead";

interface DashboardStatsProps {
  leads: Lead[];
}

export function DashboardStats({ leads }: DashboardStatsProps) {
  const total = leads.length;

  const newLeads = leads.filter((lead) => lead.status === "New").length;

  const contacted = leads.filter((lead) => lead.status === "Contacted").length;

  const converted = leads.filter((lead) => lead.status === "Converted").length;

  const stats = [
    {
      title: "Total Leads",
      value: total,
      icon: Users,
      color: "bg-blue-50 text-blue-700 border-blue-100",
    },
    {
      title: "New Leads",
      value: newLeads,
      icon: UserPlus,
      color: "bg-purple-50 text-purple-700 border-purple-100",
    },
    {
      title: "Contacted",
      value: contacted,
      icon: Phone,
      color: "bg-yellow-50 text-yellow-700 border-yellow-100",
    },
    {
      title: "Converted",
      value: converted,
      icon: Trophy,
      color: "bg-green-50 text-green-700 border-green-100",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title} className={stat.color}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm opacity-80">{stat.title}</p>

                  <h2 className="mt-3 text-3xl font-bold">{stat.value}</h2>
                </div>

                <Icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
