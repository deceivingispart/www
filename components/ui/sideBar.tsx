"use client";
import { BsGrid } from "react-icons/bs";
import { CiMusicNote1 } from "react-icons/ci";
import { FaCode, FaHome } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav
        className="sidebar-nav relative z-10"
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow:
            "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <a href="/">
          <div className={`sidebar-item ${isActive("/") ? "active" : ""}`}>
            <FaHome className="text-xl" />
            Home
          </div>
        </a>
        <a href="/music">
          <div className={`sidebar-item ${isActive("/music") ? "active" : ""}`}>
            <CiMusicNote1 className="text-xl" />
            Music
          </div>
        </a>
        <a href="/skills">
          <div
            className={`sidebar-item ${isActive("/skills") ? "active" : ""}`}
          >
            <FaCode className="text-xl" />
            Skills
          </div>
        </a>
      </nav>

      <style jsx>{`
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.75rem 0.375rem;
          border-radius: 1rem;
          margin-left: 0.75rem;
          z-index: 99;
        }

        /* mobile: barra fixa na parte inferior, horizontal */
        @media (max-width: 640px) {
          .sidebar-nav {
            position: fixed;
            bottom: 1rem;
            left: 50%;
            transform: translateX(-50%);
            margin-left: 0;
            flex-direction: row;
            padding: 0.375rem 0.75rem;
            border-radius: 9999px;
          }
        }

        .sidebar-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.125rem;
          padding: 0.25rem 0.5rem;
          border-radius: 0.75rem;
          color: rgba(255, 255, 255, 0.45);
          background: transparent;
          border: 1px solid transparent;
          font-size: 0.65rem;
          letter-spacing: 0.03em;
          transition: all 0.2s;
          cursor: pointer;
        }
        .sidebar-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .sidebar-item.active {
          color: rgba(200, 160, 255, 1);
          background: rgba(160, 100, 255, 0.15);
          border: 1px solid rgba(160, 100, 255, 0.25);
        }
      `}</style>
    </>
  );
}
