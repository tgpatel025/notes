import classNames from "classnames";

function Button({ children, primary, secondary, ...props }) {
  const className = classNames(
    props.className,
    "rounded uppercase tracking-wide drop-shadow-md rounded-full",
    {
      "bg-yellow-500 text-white": primary,
      "border border-solid border-black text-black": secondary,
    }
  );

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}

export default Button;
