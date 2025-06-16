export default function ClearButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-8 py-3 bg-white text-base border-black border-2 rounded-[10px] hover:underline hover:bg-gray-200 font-medium"
    >
      Clear
    </button>
  );
}
