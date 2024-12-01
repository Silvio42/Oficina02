import Link from "next/link";

export const Header = () => {
  return (
    <nav data-testid="header">
      <ul>
        <li>
          <Link href="/">Início</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/workshops">Workshops</Link>
        </li>
      </ul>
    </nav>
  );
};
