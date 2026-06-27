import { SafeResourceUrl } from '@angular/platform-browser';

export interface Video {
  title: string;
  url: SafeResourceUrl;
}

export interface Resource {
  icon: string;
  title: string;
  desc: string;
  href: string;
}
