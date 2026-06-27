import { Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Video, Resource } from '../../shared/models/scout-resources.model';


@Component({
  selector: 'app-scout-resources',
  imports: [],
  templateUrl: './scout-resources.component.html',
  styleUrl: './scout-resources.component.scss'
})
export class ScoutResourcesComponent {
  
  private sanitizer = inject(DomSanitizer);

  videos: Video[] = [
    {
      title: 'Welcome to Scouting',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/-wUZ_yeY9qc')
    },
    {
      title: 'What is Cub Scouts?',
      url: this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/De1JbT6Vglg')
    },
  ];

  resources: Resource[] = [
    {
      icon: '📖',
      title: 'Cub Scouts Parent Guide',
      desc: 'An orientation guide covering everything new families need to know about the Cub Scout program.',
      href: 'https://ocbsa.org/wp-content/uploads/2023/10/Parent-Orientation-Guide-2020-Small.pdf'
    },
    {
      icon: '🛡️',
      title: 'Guide to Safe Scouting',
      desc: 'BSA\'s official policies and procedures for keeping Scouts safe in all activities.',
      href: 'https://www.scouting.org/health-and-safety/gss/'
    },
  ];
}
