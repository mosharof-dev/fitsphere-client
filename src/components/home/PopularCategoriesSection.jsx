import React from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const categories = [
  {
    title: "Yoga",
    classes: "45 Classes",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Strength Training",
    classes: "82 Classes",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "HIIT",
    classes: "56 Classes",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Cardio",
    classes: "64 Classes",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "CrossFit",
    classes: "38 Classes",
    image:
      "https://images.unsplash.com/photo-1526506114642-54a56111f185?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Weight Loss",
    classes: "70 Classes",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
  },
];

export default function PopularCategoriesSection() {
  return (
    <section className="relative py-24 bg-[#020617] text-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Explore Popular{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#06B6D4] to-[#3B82F6]">
                Categories
              </span>
            </h2>
          </div>
          <div>
            <Link
              href="/classes"
              className="group flex items-center space-x-2 text-[#06B6D4] font-semibold hover:text-cyan-300 transition-colors text-lg"
            >
              <span>View All Categories</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.6)]"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-800 ease-out group-hover:scale-110"
              />
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#020617] via-[#020617]/60 to-transparent opacity-90 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <h3 className="text-3xl font-extrabold text-white mb-2 group-hover:-translate-y-2 transition-transform duration-500 tracking-tight">
                  {cat.title}
                </h3>
                <p className="text-[#06B6D4] font-semibold text-lg group-hover:-translate-y-2 transition-transform duration-500 delay-75">
                  {cat.classes}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
