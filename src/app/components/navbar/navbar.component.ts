import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  path: string;
  children?: { label: string; path: string; fragment?: string }[];
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  mobileOpen = signal(false);
  activeDropdown = signal<string | null>(null);
  scrolled = signal(false);

  navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Activities', path: '/campouts' },
    { label: 'Fundraising', path: '/fundraising' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'About', path: '/about' },
    {
      label: 'Guides & Resources', path: '/camping-beginners',
      children: [
        { label: 'Scout Resources', path: '/scout-resources' },
        { label: 'Uniform Guide', path: '/uniform' },
        { label: 'Scout Rank Requirements', path: '/scout-ranks' },
        { label: 'Camping for Beginners', path: '/camping-beginners' },
        { label: 'Adult Roles', path: '/adult-roles' },
        { label: 'Volunteers', path: '/volunteers' },
        { label: 'Glossary', path: '/glossary' }
      ]
    },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 16);
  }

  toggleMobile() {
    this.mobileOpen.update(v => !v);
    if (this.mobileOpen()) this.activeDropdown.set(null);
  }

  toggleDropdown(label: string) {
    this.activeDropdown.update(v => v === label ? null : label);
  }

  closeMobile() {
    this.mobileOpen.set(false);
    this.activeDropdown.set(null);
  }
}
