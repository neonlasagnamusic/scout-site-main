import { Component, signal } from '@angular/core';

type Tab = 'cooking' | 'gear' | 'agenda';
type GearSection = 'family' | 'backpacking' | 'tents' | 'aol';

@Component({
  selector: 'app-camping-beginners',
  imports: [],
  templateUrl: './camping-beginners.component.html',
  styleUrl: './camping-beginners.component.scss'
})
export class CampingBeginnersComponent {
  activeTab = signal<Tab>('cooking');

  tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'cooking', label: 'Camp Cooking', icon: '🔥' },
    { id: 'gear',    label: 'Gear',         icon: '🎒' },
    { id: 'agenda',  label: 'Sample Agenda', icon: '📋' },
  ];

  openSections = signal<Set<GearSection>>(new Set());

  setTab(tab: Tab) {
    this.activeTab.set(tab);
  }

  toggleSection(id: GearSection) {
    this.openSections.update(s => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  isOpen(id: GearSection): boolean {
    return this.openSections().has(id);
  }
}
