import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import API from "@/lib/axios";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/Card";
import SkeletonCard from "@/components/SkeletonCard";
import SumCard from "@/components/SumCard";
import RecentCard from "@/components/RecentCard";
import ExpenseDrawer from "@/components/ExpenseDrawer";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    balance: 0,
    totalIncome: 0,
    totalExpense: 0,
    transactionCount: 0,
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await API.get("/summary");
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await API.get("/transactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchSummary(), fetchTransactions()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  return (
    <motion.div
      className="relative flex flex-col min-h-screen w-full p-6"
      initial={{ opacity: 0, y: 20 }} // Initial state
      animate={{ opacity: 1, y: 0 }} // Animation state
      exit={{ opacity: 0, y: 20 }} // Exit state
      transition={{ duration: 0.5, ease: "easeInOut" }} // Animation timing
    >
      <div className="flex items-center gap-4 mb-6">
        <SearchBar placeholder="Explore more..." onSearch={handleSearch} />
        <ExpenseDrawer />
      </div>
      {loading ? (
        <div className="grid grid-cols-1 gap-6 mb-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 mb-6">
          <SumCard
            balance={summary.balance}
            totalIncome={summary.totalIncome}
            totalExpense={summary.totalExpense}
            transactionCount={summary.transactionCount}
          />
          <RecentCard transactions={transactions} />
        </div>
      )}
      {loading ? (
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 1 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </main>
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image_url || "/store.svg"}
              name={product.name}
              price={`Rp${product.price}`}
              store={`Store ID: ${product.store_id}`}
              stock={product.stock}
            />
          ))}
        </main>
      )}
    </motion.div>
  );
}

export default HomePage;
