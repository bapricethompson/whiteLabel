export default function ClearButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-8 py-3 bg-background text-base border-steel border-2 rounded-[10px] hover:underline  font-medium"
    >
      Clear
    </button>
  );
}
