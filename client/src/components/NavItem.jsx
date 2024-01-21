import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

function NavItem({ item }) {
  const { label, href } = item;
  const [active, setActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setActive(location.pathname.includes(href));
  }, [href, location]);

  const className = twMerge(
    classNames(
      "mx-2 w-40 text-center uppercase tracking-wide px-2 py-1 text-black",
      {
        "text-white bg-yellow-500 drop-shadow-md rounded-full": active,
      }
    )
  );

  return (
    <Link className={className} to={href}>
      {label}
    </Link>
  );
}

export default NavItem;
