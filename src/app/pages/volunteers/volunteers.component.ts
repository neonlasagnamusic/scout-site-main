import { Component } from '@angular/core';


@Component({
  selector: 'app-volunteers',
  imports: [],
  templateUrl: './volunteers.component.html',
  styleUrl: './volunteers.component.scss'
})
export class VolunteersComponent {
  
  roles = [
    { icon: '📋', label: 'Committee Member' },
    { icon: '🦅', label: 'Den Leader' },
    { icon: '🤝', label: 'Assistant Den Leader' },
    { icon: '👨‍👩‍👧', label: 'Den Parent' },
    { icon: '📅', label: 'Event Planner' },
    { icon: '📅', label: 'Event Helper' },
    { icon: '🍿', label: 'Fundraising Volunteer' },
  ];
}
