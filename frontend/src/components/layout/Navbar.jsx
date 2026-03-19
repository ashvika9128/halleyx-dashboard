import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Orders', path: '/orders' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-8">
      <span className="text-xl font-bold text-emerald-600">Halleyx</span>
      <div className="flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-sm font-medium pb-1 border-b-2 transition-colors ${
              pathname.startsWith(item.path)
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}