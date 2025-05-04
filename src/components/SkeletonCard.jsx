import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className="w-full max-w-md bg-card shadow-md rounded-lg p-4 border-border">
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" /> {/* Title Skeleton */}
        <Skeleton className="h-4 w-1/2" /> {/* Subtitle Skeleton */}
        <Skeleton className="h-4 w-full" /> {/* Content Skeleton */}
        <Skeleton className="h-4 w-3/4" /> {/* Content Skeleton */}
      </div>
    </div>
  );
}
