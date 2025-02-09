"use client";
import Link from "next/link";
import { useMemo, useState } from "react";

import { getUserId } from "@/actions/userCookies";

export const Header = () => {
  const [userId, setUserId] = useState<string | null>();

  const loadUser = () => {
    const userId = getUserId();
    setUserId(userId);
  };

  useMemo(() => {
    if (!userId) loadUser();
  }, [userId]);

  return (
    <nav className="header" data-testid="header">
      <ul>
        <li>
          <Link href="/">Início</Link>
        </li>
        {!userId && (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}

        <li>
          <Link href="/workshops">Workshops</Link>
        </li>
      </ul>
    </nav>
  );
};
