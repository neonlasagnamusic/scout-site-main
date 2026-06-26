import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  carouselImages = [
    'images/carousel/_DSC7317 treated_photo_CSBC.jpg',
    'images/carousel/_DSC7941 treated_photo_CSBC.jpg',
  ];

  activeIndex = signal(0);
  private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.activeIndex.update(i => (i + 1) % this.carouselImages.length);
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  activities = [
    { icon: '⛺', title: 'Family Campouts', desc: 'At least 2 overnight campouts per year with the whole family.' },
    { icon: '🏅', title: 'Pinewood Derby', desc: 'The classic car-building race that kids (and parents!) love.' },
    { icon: '🥇', title: 'Pack Olympics', desc: 'Friendly competition games and activities for the whole pack.' },
    { icon: '⛵', title: 'Sailing & Maritime', desc: 'Overnight trips on sailing vessels — unforgettable adventures.' },
    { icon: '🎲', title: 'Hungry Hungry Hippos', desc: 'We set up a kid sized arena and watch the Chaos ensue.' },
    { icon: '🤝', title: 'Service Projects', desc: 'Giving back to our community through volunteer work.' },
  ];
}
