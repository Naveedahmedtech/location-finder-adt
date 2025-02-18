interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "accent" | "error";
  }
  
  const Button: React.FC<ButtonProps> = ({ variant = "primary", className, ...props }) => (
    <button
      className={`px-4 py-2 rounded-md transition-all border border-border text-textPrimary ${className}
        ${
          variant === "primary"
            ? "bg-primary hover:bg-primary-hover"
            : variant === "secondary"
            ? "bg-secondary hover:bg-secondary-hover"
            : variant === "accent"
            ? "bg-accent hover:bg-accent-hover"
            : variant === "error"
            ? "bg-error hover:bg-error-hover"
            : ""
        }
      `}
      {...props}
    />
  );
  
  export default Button;
  