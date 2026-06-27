import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-joining',
  imports: [RouterLink],
  templateUrl: './joining.component.html',
  styleUrl: './joining.component.scss'
})
export class JoiningComponent {
  
  steps: { num: string; title: string; desc: string; link?: { label: string; url: string; internal?: boolean } }[] = [
    { num: '1', title: 'Reach Out', desc: 'Email us at info@pack541.org or attend a school recruitment event. We\'ll answer any questions and invite you to a pack meeting.' },
    { num: '2', title: 'Attend a Meeting', desc: 'Come to one of our pack or den meetings as a guest. Meet the leaders, other scouts, and get a feel for how we run things.' },
    { num: '3', title: 'Check Out the Volunteers page', desc: 'Pack 541 is entirely volunteer-run. Every family is asked to contribute in some way — whether that\'s a committee role, helping plan an event, or cooking a huge taco bar for 90 people during the spring campout dinner.  Our volunteer agreement will help to understand what joining the pack community means.', link: { label: 'Here', url: '/volunteers', internal: true } },
    { num: '4', title: 'Ready to Join?', desc: 'Complete the official BSA membership registration online. Annual dues apply.', link: { label: 'Register Here', url: 'https://my.scouting.org/online-registration/7cee2fb8-7e2b-46db-ad73-1632d0aa7aa7/applicant-type' } },
    { num: '5', title: 'Get Uniform & Gear', desc: 'Pick up the Cub Scout uniform at your local Scout Shop. We\'ll tell you exactly what you need based on your child\'s grade/rank.' },
  ];
}
