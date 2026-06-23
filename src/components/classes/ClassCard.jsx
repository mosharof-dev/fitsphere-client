import { Clock, Users, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ClassCard({ classItem }) {
  const {
    _id,
    class_name,
    description,
    price,
    difficulty,
    category,
    duration,
    featured_image_url,
    trainerName,
    trainerImage,
    bookingCount,
  } = classItem;

  const difficultyStyles = {
    Beginner: "text-[#06B6D4] bg-white",
    Intermediate: "text-[#F59E0B] bg-white",
    Advanced: "text-[#EF4444] bg-white",
  };

  // Give each category a different color for the text, with white background
  const categoryStyles = {
    "Yoga": "text-emerald-500 bg-white",
    "Cardio": "text-orange-500 bg-white",
    "Strength Training": "text-blue-500 bg-white",
    "Pilates": "text-purple-500 bg-white",
    "HIIT": "text-red-500 bg-white",
    "CrossFit": "text-stone-700 bg-white",
    "Zumba": "text-pink-500 bg-white",
    "Bodybuilding": "text-rose-600 bg-white",
  };

  const diffStyle = difficultyStyles[difficulty] || "text-[#3B82F6] bg-white";
  const catStyle = categoryStyles[category] || "text-teal-600 bg-white";

  return (
    <div className="w-full bg-[#0B1120] hover:bg-[#0F172A] border border-slate-800 rounded-2xl group overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-[#06B6D4]/10">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          alt={class_name}
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          src={featured_image_url || "/placeholder-class.jpg"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-90" />
        
        {/* Badges: Left and Right */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-md ${catStyle}`}>
            {category}
          </span>
        </div>
        
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-md ${diffStyle}`}>
            {difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-[#06B6D4] transition-colors leading-tight">
            {class_name}
          </h3>
          
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center gap-5 text-sm text-slate-400 pt-2 border-b border-slate-800/50 pb-3">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#3B82F6]" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#3B82F6]" />
              <span>{bookingCount} Booked</span>
            </div>
          </div>
          
          <div className="text-sm text-slate-400 pt-3 flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#3B82F6]" />
              <span className="font-medium text-slate-300">Trainer:</span>
              <span className="truncate max-w-[100px] sm:max-w-[120px]">{trainerName}</span>
            </div>
            
            <div className="flex items-center font-bold">
              <span className="text-sm font-medium mr-1 text-slate-400">Price:</span>
              <span className="text-[#06B6D4] text-sm mr-0.5">$</span>
              <span className="text-[#06B6D4] text-lg leading-none">{price}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <Link 
            href={`/classes/${_id}`}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r from-[#3B82F6]/10 to-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20 hover:bg-gradient-to-r hover:from-[#3B82F6] hover:to-[#06B6D4] hover:text-white transition-all duration-300 shadow-lg hover:shadow-[#06B6D4]/25 group/btn"
          >
            View Full Details
            <ArrowRight className="w-4 h-4 text-[#06B6D4] group-hover/btn:text-white transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}
