import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion"; 
import { AlertContext } from "@/App"; 
import API from "@/lib/axios"; 
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ExpensePage() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true); 
  const showAlert = useContext(AlertContext); 

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await API.get("/transactions"); 
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
        showAlert("destructive", "Error", "Failed to fetch expenses.");
      } finally {
        setLoading(false); 
      }
    };

    fetchExpenses();
  }, [showAlert]);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      setExpenses((prev) => prev.filter((expense) => expense._id !== id)); 
      showAlert("default", "Success", "Expense deleted successfully!");
    } catch (error) {
      console.error("Error deleting expense:", error);
      showAlert("destructive", "Error", "Failed to delete expense.");
    }
  };

  return (
    <motion.div
      className="p-6"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 20 }} 
      transition={{ duration: 0.5, ease: "easeInOut" }} 
    >
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>

      <Table className="bg-card shadow-sm">
        <TableCaption>A list of your expenses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense._id}>
              <TableCell className="font-medium">{expense.name}</TableCell>
              <TableCell
                className={expense.amount < 0 ? "text-red-600" : "text-green-600"}
              >
                Rp{Math.abs(expense.amount)}
              </TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-destructive text-white hover:bg-destructive/90"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the expense.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(expense._id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}