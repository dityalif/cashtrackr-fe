import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export default function SumCard({ balance, totalIncome, totalExpense, transactionCount }) {
  return (
    <Card className="w-full max-w-md bg-card shadow-md rounded-lg p-4 border-border">
      <CardHeader>
        <CardTitle className="text-xl text-foreground font-bold text-left">Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-secondary-foreground">Balance:</span>
            <span className="font-bold text-primary">Rp{balance}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-secondary-foreground">Total Income:</span>
            <span className="font-bold text-primary">Rp{totalIncome}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-secondary-foreground">Total Expense:</span>
            <span className="font-bold text-primary">Rp{totalExpense}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-secondary-foreground">Jumlah Transaksi:</span>
            <span className="font-bold text-primary">{transactionCount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}