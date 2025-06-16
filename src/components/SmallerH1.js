export default function SmallerH1({ children, className = "" }) {
  return (
    <h1 className={`text-4xl md:text-5xl py-4 ${className}`}>{children}</h1>
  );
}
