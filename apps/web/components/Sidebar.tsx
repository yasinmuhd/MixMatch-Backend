'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../lib/auth-context';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/restaurants', label: 'Restaurants' },
  { href: '/dashboard/menu', label: 'Menu' },
  { href: '/dashboard/orders', label: 'Orders' },
  { href: '/dashboard/settings', label: 'Settings' },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside
      style={{
        width: '220px',
        minHeight: '100vh',
        borderRight: '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem 1rem',
        gap: '0.25rem',
      }}
    >
      <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>Discoverly</p>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: isActive ? 600 : 400,
                background: isActive ? '#f3f4f6' : 'transparent',
                color: '#111827',
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {user && (
        <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>{user.email}</p>
          <button
            type="button"
            onClick={logout}
            style={{ fontSize: '0.85rem', cursor: 'pointer', background: 'none', border: 'none', color: '#ef4444' }}
          >
            Sign out
          </button>
        </div>
      )}
    </aside>
  );
}
