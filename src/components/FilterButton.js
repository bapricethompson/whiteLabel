export default function FilterButton({ onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 flex items-center rounded-[10px] font-medium transition-colors text-white ${
        active ? "bg-accentHover" : "bg-accent "
      }`}
    >
      Filter
      <span className="material-icons">arrow_drop_down</span>
    </button>
  );
}
