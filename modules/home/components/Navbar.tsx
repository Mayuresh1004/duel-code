"use client";
import { UserRole } from "@/app/generated/prisma/enums";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";

export function NavbarHome({userRole}:any) {
  const navItems = [
    {
      name: "Problems",
      link: "/problems",
    },
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Profile",
      link: "#profle",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full h-screen">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary"><ModeToggle /></NavbarButton>

            <SignedIn>
              {userRole && userRole===UserRole.ADMIN &&(
                <Link href={"/create-problem"}>
                  <NavbarButton variant={"primary"} >
                    Create Problem
                  </NavbarButton>
                </Link>
              ) }
              <UserButton />
            </SignedIn>

            <SignedOut>

            <NavbarButton variant="secondary">
              <SignInButton>
                Sign In
              </SignInButton>
            </NavbarButton>
            <NavbarButton variant="primary">
              <SignUpButton>
                Sign Up
              </SignUpButton>
            </NavbarButton>

            </SignedOut>

          </div>
        </NavBody>

        

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}


