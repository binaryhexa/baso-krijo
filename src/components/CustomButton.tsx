import { Button, ButtonProps } from "@mui/material";

interface CustomButtonProps extends ButtonProps {
  variant?: "text" | "outlined" | "contained";
  label: string;
  className?: string; 
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "contained",
  label,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      sx={{
        textTransform: "none",
        borderRadius: "50px",
        boxShadow: "none",
        color: variant === "contained" ? "white" : "#980000",
        backgroundColor: variant === "contained" ? "#980000" : "transparent",
        border: variant === "outlined" ? "2px solid #980000" : "none",
        marginBottom: "10px",
        padding: "10px"
      }}
      variant={variant}
      className={className}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
