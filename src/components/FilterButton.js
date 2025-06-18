"use client";
export default function FilterButton({ onClick, active, children }) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className={`px-8 py-3 flex items-center rounded-[10px] font-medium transition-colors text-white ${
          active ? "bg-accentHover" : "bg-accent"
        }`}
      >
        Filter
        <span className="material-icons">arrow_drop_down</span>
      </button>

      {active && (
        <div
          className="
            absolute top-full mt-2 
            left-0 right-auto
            min-w-[250px]  md:w-[250px]
            bg-background border border-borders 
            rounded-lg shadow-lg z-50
            md:left-0 md:right-auto
          "
          style={{ minWidth: "auto" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
