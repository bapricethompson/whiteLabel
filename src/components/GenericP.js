export default function GenericP({ children, className = "" }) {
  return <p className={`my-6 ${className}`}>{children}</p>;
}
