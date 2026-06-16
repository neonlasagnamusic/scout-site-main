import { Component, HostListener, OnInit, inject } from '@angular/core';
import { RolesService, RoleEntry } from '../../services/roles.service';

interface ModalEntry {
  label: string;
  name: string;
  notes: string;
}

export interface ModalData {
  title: string;
  isDenLeader: boolean;
  entries: ModalEntry[];
}

interface RoleCard {
  title: string;
  type: string;
  icon: string;
  description: string;
  isDenLeader: boolean;
  modal: ModalData;
}

@Component({
  selector: 'app-adult-roles',
  imports: [],
  templateUrl: './adult-roles.component.html',
  styleUrl: './adult-roles.component.scss'
})
export class AdultRolesComponent implements OnInit {
  private rolesService = inject(RolesService);

  loading = true;
  error = false;
  leadershipCards: RoleCard[] = [];
  volunteerCards: RoleCard[] = [];
  activeModal: ModalData | null = null;

  private readonly roleMeta: { match: string; icon: string; description: string }[] = [
    { match: 'assistant cubmaster', icon: '⭐', description: 'Supports the Cubmaster in leading the pack and steps in during pack meetings and events when needed.' },
    { match: 'cubmaster',           icon: '🦅', description: 'Leads the pack and presides over pack meetings. Primary contact for den leaders and key events.' },
    { match: 'committee chair',     icon: '📋', description: 'Oversees pack administration, recharter, financials, and committee operations.' },
    { match: 'secretary',           icon: '📝', description: 'Manages pack communications, records meeting minutes, and maintains member records.' },
    { match: 'treasurer',           icon: '💰', description: 'Manages pack finances, tracks dues and expenses, and provides financial reporting to the committee.' },
    { match: 'advancement',         icon: '🏆', description: 'Tracks Scout advancement progress and coordinates badge and rank award ceremonies.' },
    { match: 'recruiting',          icon: '🤝', description: 'Leads membership recruitment efforts and helps welcome new Scouts and families to the pack.' },
    { match: 'popcorn',             icon: '🍿', description: 'Coordinates annual fundraising campaigns including the Trail\'s End popcorn sale and other drives.' },
    { match: 'camping',             icon: '⛺', description: 'Plans and coordinates pack campouts, hikes, and outdoor activities throughout the year.' },
    { match: 'service',             icon: '🤲', description: 'Organizes community service projects and coordinates volunteer opportunities for Scouts and families.' },
    { match: 'chartered',           icon: '🏛️', description: 'Represents the chartered organization that sponsors Pack 541 and ensures alignment with BSA standards.' },
    { match: 'webmaster',           icon: '💻', description: 'Maintains the pack website and digital presence. Updates event info and coordinates with leaders on announcements.' }
  ];

  ngOnInit(): void {
    this.rolesService.getRoles().subscribe({
      next: entries => {
        this.buildCards(entries);
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }

  private buildCards(entries: RoleEntry[]): void {
    const denEntries = entries.filter(e => e.position.toLowerCase().startsWith('den leader'));
    const otherEntries = entries.filter(e => !e.position.toLowerCase().startsWith('den leader'));

    const cards: RoleCard[] = otherEntries.map(entry => {
      const meta = this.getMetaFor(entry.position);
      return {
        title: entry.position,
        type: entry.type || 'Volunteer',
        icon: meta.icon,
        description: meta.description,
        isDenLeader: false,
        modal: {
          title: entry.position,
          isDenLeader: false,
          entries: [{ label: '', name: entry.name, notes: entry.notes }]
        }
      };
    });

    if (denEntries.length > 0) {
      cards.push({
        title: 'Den Leaders',
        type: 'Leadership',
        icon: '🏕️',
        description: 'Lead specific dens by grade level, plan weekly meetings, and guide Scouts through rank requirements.',
        isDenLeader: true,
        modal: {
          title: 'Den Leaders',
          isDenLeader: true,
          entries: denEntries.map(e => ({
            label: e.position.replace(/^den leader\s*[-–]\s*/i, ''),
            name: e.name,
            notes: e.notes
          }))
        }
      });
    }

    this.leadershipCards = cards.filter(c => c.type.toLowerCase() === 'leadership');
    this.volunteerCards  = cards.filter(c => c.type.toLowerCase() !== 'leadership');
  }

  private getMetaFor(position: string): { icon: string; description: string } {
    const lower = position.toLowerCase();
    for (const meta of this.roleMeta) {
      if (lower.includes(meta.match)) return meta;
    }
    return { icon: '👤', description: '' };
  }

  openModal(card: RoleCard): void {
    this.activeModal = card.modal;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.activeModal = null;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeModal();
  }
}
