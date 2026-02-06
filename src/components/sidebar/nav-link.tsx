import { Link } from "@tanstack/react-router";
import styles from "./sidebar.module.css";

interface SidebarNavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  exact?: boolean;
}

export function NavLink({to, icon, text, exact = false}: SidebarNavLinkProps) {
  return (
    <li key={to}>
      <Link
        to={to}
        activeOptions={{ exact }}
        activeProps={{ className: `${styles.navLink} ${styles.active}` }}
        inactiveProps={{ className: styles.navLink }}
      >
        <span className={styles.navIcon}>{icon}</span>
        <span className={styles.navText}>{text}</span>
      </Link>
    </li>
  )
}
