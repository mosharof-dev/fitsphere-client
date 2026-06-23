import { Dumbbell, AlertTriangle } from "lucide-react";
import ClassCard from "./ClassCard";
import ClassCardSkeleton from "./ClassCardSkeleton";

export default function ClassesList({ classes, isLoading, error }) {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">Oops! Something went wrong</h3>
        <p className="text-muted-foreground max-w-md">
          We&apos;re currently updating our fitness classes. Please try again in a few moments.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <ClassCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!classes || classes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4 bg-card/30 rounded-3xl border border-border/50">
        <Dumbbell className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-2xl font-bold text-foreground mb-2">No Classes Found</h3>
        <p className="text-muted-foreground max-w-md">
          No classes available at the moment. Please check back later or try adjusting your search filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {classes.map((classItem) => (
        <ClassCard key={classItem._id} classItem={classItem} />
      ))}
    </div>
  );
}
