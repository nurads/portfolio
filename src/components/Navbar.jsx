import { useEffect, useState } from "react";
import {
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  SideNav,
  SideNavItems,
  SideNavLink,
  SkipToContent,
} from "@carbon/react";
import { Document, LogoGithub, LogoLinkedin } from "@carbon/icons-react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

/** Highlights the nav item for whichever section currently owns the viewport. */
const useActiveSection = () => {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    for (const { id } of SECTIONS) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return active;
};

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  const active = useActiveSection();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <Header aria-label="Murad Usman portfolio">
      <SkipToContent />
      {/* isCollapsible is misleadingly named: passing it stops Carbon from
          hiding the button at the lg breakpoint, so it would show even
          alongside the desktop HeaderNavigation. Omitting it keeps this
          mobile-only, as intended. */}
      <HeaderMenuButton
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        isActive={menuOpen}
        onClick={() => setMenuOpen((previous) => !previous)}
      />
      <HeaderName href="#home" prefix="Murad">
        Usman
      </HeaderName>

      <HeaderNavigation aria-label="Sections">
        {SECTIONS.map(({ id, label }) => (
          <HeaderMenuItem
            key={id}
            href={`#${id}`}
            isCurrentPage={active === id}
          >
            {label}
          </HeaderMenuItem>
        ))}
      </HeaderNavigation>

      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Resume"
          tooltipAlignment="end"
          onClick={() => window.open("/murad-usman.pdf", "_blank")}
        >
          <Document size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="GitHub"
          tooltipAlignment="end"
          onClick={() => window.open("https://github.com/nurads", "_blank")}
        >
          <LogoGithub size={20} />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="LinkedIn"
          tooltipAlignment="end"
          onClick={() =>
            window.open("https://linkedin.com/in/murad-usman", "_blank")
          }
        >
          <LogoLinkedin size={20} />
        </HeaderGlobalAction>
      </HeaderGlobalBar>

      <SideNav
        aria-label="Section navigation"
        expanded={menuOpen}
        isPersistent={false}
        onOverlayClick={close}
      >
        <SideNavItems>
          {SECTIONS.map(({ id, label }) => (
            <SideNavLink
              key={id}
              href={`#${id}`}
              isActive={active === id}
              onClick={close}
            >
              {label}
            </SideNavLink>
          ))}
        </SideNavItems>
      </SideNav>
    </Header>
  );
};
