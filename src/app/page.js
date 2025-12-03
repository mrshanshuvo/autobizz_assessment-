import { FiArrowRight } from "react-icons/fi";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-3xl w-full mx-auto">
        {/* Thin top accent line */}
        <div className="h-px bg-[#050E3C] mb-8 sm:mb-12 md:mb-16"></div>

        {/* Main content */}
        <div className="space-y-6 sm:space-y-8">
          {/* Heading */}
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-light text-[#050E3C] tracking-tight leading-snug sm:leading-tight">
            AutoBizz
            <br />
            Assessment
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-[#050E3C] font-light tracking-wide">
            Junior Frontend Engineer — Dashboard Project
          </p>

          {/* CTA Button - The ONLY red element */}
          <div className="pt-6 sm:pt-8">
            <a
              href="/dashboard"
              className="inline-flex items-center justify-center bg-[#DC0000] text-white px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-base sm:text-lg font-medium tracking-wide hover:bg-[#B00000] transition-colors duration-200 w-full sm:w-auto group"
            >
              <span className="whitespace-nowrap">GO TO DASHBOARD</span>
              <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>

        {/* Thin bottom accent line */}
        <div className="h-px bg-[#050E3C] mt-8 sm:mt-12 md:mt-16"></div>

        {/* Minimal footer text */}
        <p className="text-xs sm:text-sm text-[#050E3C] opacity-40 mt-6 sm:mt-8 tracking-widest uppercase text-center sm:text-left">
          Confident Simplicity
        </p>
      </div>
    </div>
  );
}
