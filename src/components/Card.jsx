import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductCard({ image, name, price, store, stock }) {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <img
          src={image}
          alt={name}
          className="w-full h-40 object-cover rounded-md"
        />
      </CardHeader>
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {store} {/* Menampilkan nama toko */}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-lg font-semibold text-primary">{price}</p>
        <p className="text-sm text-muted-foreground">Stock: {stock}</p>
      </CardFooter>
    </Card>
  );
}
