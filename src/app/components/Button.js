export default function Button({
  children,
  type = "button",
  onClick,
  variant = "accent",
  size = "md", // 'sm', 'md', 'lg'
  className = "",
  href, // optional - if present, renders an <a>
  target, // optional - for links
  rel, // optional - for links
  ...props // spread for any extra props
}) {
  const base =
    "font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    accent: "bg-accent text-black hover:bg-accentHover focus:ring-accent",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combinedClasses = ` ${base} ${
    variantClasses[variant] || variantClasses.primary
  } ${sizeClasses[size] || sizeClasses.md} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        onClick={onClick}
        target={target}
        rel={rel}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
