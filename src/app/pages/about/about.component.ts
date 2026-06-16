import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PackEvent {
  id: string;
  title: string;
  icon: string;
  season: string;
  desc: string;
}

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  values = [
    { icon: '🤝', title: 'Volunteer-Led', desc: 'Every leader is a parent volunteer — no paid staff, just dedicated families.' },
    { icon: '🌍', title: 'Gender Inclusive', desc: 'Girls and boys of all backgrounds are welcome. Anyone can be a Scout.' },
    { icon: '🧠', title: 'Neurodiversity Affirming', desc: 'We embrace Scouts of all neurotypes and work to create an environment where every child can thrive.' },
    { icon: '🏕️', title: 'Adventure-First', desc: 'We prioritize real experiences: camping, sailing, service, and exploration.' },
    { icon: '🎓', title: 'Learn by Doing', desc: 'Scouts build confidence and skills through hands-on activities, not lectures.' },
  ];

  events: PackEvent[] = [
    { id: 'fall-campout', title: 'Fall Campout', icon: '🍂', season: 'Fall', desc: 'Our signature autumn overnight camping trip. Scouts and families enjoy campfire cooking, hiking, and stargazing.' },
    { id: 'spring-campout', title: 'Spring Campout', icon: '🌸', season: 'Spring', desc: 'The second family campout of the year. Warmer weather, wildflowers, and great outdoor memories.' },
    { id: 'pinewood-derby', title: 'Pinewood Derby', icon: '🏎️', season: 'Winter', desc: 'The legendary car-building race. Scouts and parents design and build wood cars from official BSA kits.' },
    { id: 'raingutter-regatta', title: 'Raingutter Regatta', icon: '⛵', season: 'Summer', desc: 'Scouts build and race small sailboats down water-filled raingutters using only lung power.' },
    { id: 'maritime', title: 'Maritime Overnighter', icon: '🚢', season: 'Spring', desc: 'An unforgettable overnight trip aboard a tall sailing ship — one of the highlights of the scouting year.' },
    { id: 'blue-gold', title: 'Blue & Gold Banquet', icon: '🎉', season: 'Winter', desc: 'Annual pack celebration dinner honoring Scout achievements, rank advancements, and leadership.' },
    { id: 'scout-o-rama', title: 'Scout-O-Rama', icon: '🗺️', season: 'Fall', desc: 'A county-wide scouting showcase where packs display their best projects and activities.' },
    { id: 'pack-olympics', title: 'Pack Olympics', icon: '🥇', season: 'Summer', desc: 'Fun games and friendly competition between dens. A great way to build teamwork and pack spirit.' },
    { id: 'hungry-hippos', title: 'Hungry Hungry Hippos', icon: '🎲', season: 'Fall', desc: 'We set up a kid sized arena and watch the chaos ensue.' },
    { id: 'service', title: 'Service Projects', icon: '🤝', season: 'Year-round', desc: 'Scouts give back to the community through clean-up events, food drives, and volunteer work.' },
  ];
}
