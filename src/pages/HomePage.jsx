import React, { useEffect, useState } from "react";
import API from "@/lib/axios"; // Import axios instance
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
        const response = await API.get("/summary"); // Fetch summary from backend
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching summary:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await API.get("/transactions"); // Fetch transactions from backend
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
    <div className="relative flex flex-col min-h-screen w-full p-6">
      <div className="flex items-center gap-4 mb-6">
        {/* SearchBar */}
        <SearchBar placeholder="Explore more..." onSearch={handleSearch} />
        {/* ExpenseDrawer */}
        <ExpenseDrawer />
      </div>
      <div className="grid grid-cols-1 gap-6 mb-6">
        <SumCard
          balance={summary.balance}
          totalIncome={summary.totalIncome}
          totalExpense={summary.totalExpense}
          transactionCount={summary.transactionCount}
        />
        <RecentCard transactions={transactions} />
      </div>
      {loading ? (
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
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
    </div>
  );
}

export default HomePage;
