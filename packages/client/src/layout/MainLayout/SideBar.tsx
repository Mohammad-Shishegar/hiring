import { useEffect, useRef, useState, ReactNode } from "react";

interface DrawerMenuProps {
  initialOpen?: boolean;
}

interface MenuItem {
  title: string;
  content: ReactNode;
}

export default function Sidebar({ initialOpen = false }: DrawerMenuProps) {
  const [open, setOpen] = useState<boolean>(initialOpen);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);
  const openDrawer = () => setOpen(false);

  const menu: MenuItem[] = [
    {
      title: "Profile",
      content: (
        <div className="text-sm text-gray-600">
          <p>View and edit your profile</p>
          <a className="text-blue-600 hover:underline" href="#">
            Edit profile
          </a>
        </div>
      ),
    },
    {
      title: "Settings",
      content: (
        <div className="text-sm text-gray-600">
          <p>Application settings</p>
          <a className="text-blue-600 hover:underline" href="#">
            Go to settings
          </a>
        </div>
      ),
    },
    {
      title: "Help",
      content: (
        <div className="text-sm text-gray-600">
          <p>Support & FAQ</p>
          <a className="text-blue-600 hover:underline" href="#">
            Visit help center
          </a>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-40 bg-black"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        onClick={close}
      />

      {/* drawer */}
      <aside
        id="drawer-menu"
        ref={drawerRef}
        role="dialog"
        aria-label="Main drawer menu"
        aria-hidden={!open}
        className={`fixed top-0 right-0 z-[110] h-full w-[300px] transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        } bg-white shadow-lg flex flex-col`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center space-x-2">
            <button
              className="p-2 rounded hover:bg-gray-100 focus:outline-none"
              onClick={close}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <h3 className="text-lg font-medium">Menu</h3>
        </div>

        <nav className="overflow-auto px-2 py-3 flex-1">
          <ul className="space-y-2   ">
            {menu.map((m, idx) => {
              const isOpen = expandedIndex === idx;
              return (
                <li key={idx} className="bg-white rounded">
                  <button
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded focus:outline-none"
                    onClick={() =>
                      setExpandedIndex((cur) => (cur === idx ? null : idx))
                    }
                    aria-expanded={isOpen}
                    aria-controls={`panel-${idx}`}
                  >
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M5 8l5 5 5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-medium">{m.title}</span>
                  </button>

                  <div
                    id={`panel-${idx}`}
                    className={`px-3 overflow-hidden transition-all duration-200 ${
                      isOpen ? "max-h-96 py-2" : "max-h-0"
                    }`}
                    aria-hidden={!isOpen}
                  >
                    {m.content}
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 border-t pt-4 px-3">
            <a href="#" className="block py-2 hover:bg-gray-50 rounded px-2">
              Sign out
            </a>
            <a href="#" className="block py-2 hover:bg-gray-50 rounded px-2">
              Privacy
            </a>
          </div>
        </nav>

        <div className="px-4 py-3 border-t">
          <small className="text-xs text-gray-500">© 2025 Your Company</small>
        </div>
      </aside>
    </>
  );
}
