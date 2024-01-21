import NavItem from "./NavItem";

function Header() {
  const navItems = [
    {
      label: "All",
      href: "/all",
    },
    {
      label: "My notes",
      href: "/my-notes",
    },
    {
      label: "Shared with me",
      href: "/shared-with-me",
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/95 border-slate-100/10 ">
      <div className="py-4 px-8 border-b border-slate-900/10">
        <ul className="relative flex items-center list-none">
          {navItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header;
