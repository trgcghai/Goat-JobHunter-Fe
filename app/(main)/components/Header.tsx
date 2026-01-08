'use client';

import NotificationPopup from '@/app/(main)/components/NotificationPopup';
import UserPopup from '@/app/(main)/components/UserPopup';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, Briefcase, Building2, FileText, BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const NAV_LINKS = [
  { href: '/', label: 'Trang Chủ', icon: Home },
  { href: '/jobs', label: 'Việc Làm', icon: Briefcase },
  { href: '/recruiters', label: 'Nhà Tuyển Dụng', icon: Users },
  { href: '/companies', label: 'Công Ty', icon: Building2 },
  { href: '/blogs', label: 'Blog', icon: FileText },
  { href: '/hub', label: 'Story Hub', icon: BookOpen },
] as const;

export default function Header() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="GOAT Logo" className="" width={80} height={80} />
          </Link>

          <div className="flex items-center gap-4 h-full">
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative text-sm font-medium transition-colors flex flex-col items-center gap-1',
                    isActive(link.href) ? 'text-primary' : 'text-muted-foreground hover:text-primary',
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="text-sm">{link.label}</span>
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <Separator orientation="vertical" className="mx-4" />

            <div className="flex items-center gap-4">
              {!isSignedIn && (
                <>
                  <Link href="/signin">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-muted rounded-xl border-primary text-primary text-sm"
                    >
                      Đăng Nhập
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-sm"
                    >
                      Đăng Ký
                    </Button>
                  </Link>
                  <Link href="/company">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl text-sm"
                    >
                      Đăng Ký Tài Khoản Công Ty
                    </Button>
                  </Link>
                </>
              )}
              {isSignedIn && (
                <>
                  <NotificationPopup />
                  <UserPopup />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
