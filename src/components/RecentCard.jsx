import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RecentCard({ transactions }) {
  return (
    <Card className="w-full max-w-md bg-card shadow-md rounded-lg p-4 border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-foreground font-bold text-left">
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.slice(0, 5).map((transaction, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 pb-2"
            >
              <div>
                <p className="font-medium text-foreground">{transaction.name}</p>
                <p className="text-sm text-secondary-foreground">
                  {transaction.category} - {transaction.date}
                </p>
              </div>
              <p
                className={`font-bold ${
                  transaction.amount < 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                Rp{transaction.amount}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className="text-primary"
          onClick={() => (window.location.href = "/expenses")}
        >
          View All
        </Button>
      </CardFooter>
    </Card>
  );
}