export default function GenericH1({ children, className = "" }) {
  return (
    <h1
      className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl my-4 ${className}`}
    >
      {children}
    </h1>
  );
}
