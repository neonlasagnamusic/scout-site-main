import { Component, HostListener, signal } from '@angular/core';


@Component({
  selector: 'app-uniform',
  imports: [],
  templateUrl: './uniform.component.html',
  styleUrl: './uniform.component.scss'
})
export class UniformComponent {
  
  uniforms = [
    {
      rank: 'Tiger (Grade 1)',
      image: '/images/resources/tiger-uniform.png',
      items: [
        'Blue Cub Scout shirt',
        'Blue pants, shorts, or skirt',
        'Orange Tiger neckerchief with slide',
        'Tiger badge on left pocket',
        'BSA belt and buckle',
      ]
    },
    {
      rank: 'Bear (Grade 3)',
      image: '/images/resources/bear-uniform.png',
      items: [
        'Blue Cub Scout shirt',
        'Blue pants, shorts, or skirt',
        'Light blue Bear neckerchief with slide',
        'Bear badge on left pocket',
        'Rank adventure loops on belt',
        'BSA belt and buckle',
      ]
    },
    {
      rank: 'Webelos / Arrow of Light (Grades 4–5)',
      image: '/images/resources/webelos-uniform.png',
      items: [
        'Tan Scouts BSA-style shirt',
        'Olive or khaki pants or shorts',
        'Plaid Webelos neckerchief with slide',
        'Webelos or AOL badge on left pocket',
        'Activity pins on activity badge colors',
        'BSA belt and buckle',
      ]
    },
  ];

  // Lightbox state
  lightboxSrc  = signal<string | null>(null);
  lightboxAlt  = signal('');
  scale        = signal(1);
  translateX   = signal(0);
  translateY   = signal(0);

  isDragging  = false;
  private dragStartX  = 0;
  private dragStartY  = 0;
  private dragOriginX = 0;
  private dragOriginY = 0;

  get imgTransform(): string {
    return `translate(${this.translateX()}px, ${this.translateY()}px) scale(${this.scale()})`;
  }

  openLightbox(src: string, alt: string) {
    this.lightboxSrc.set(src);
    this.lightboxAlt.set(alt);
    this.resetView();
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxSrc.set(null);
    document.body.style.overflow = '';
    this.isDragging = false;
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('lb-backdrop')) {
      this.closeLightbox();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.lightboxSrc()) this.closeLightbox();
  }

  // Wheel zoom on the lightbox backdrop
  onWheel(event: WheelEvent) {
    event.preventDefault();
    this.applyZoom(event.deltaY > 0 ? -0.12 : 0.12);
  }

  zoomIn()    { this.applyZoom(0.3); }
  zoomOut()   { this.applyZoom(-0.3); }
  resetZoom() { this.resetView(); }

  private applyZoom(delta: number) {
    const next = Math.min(6, Math.max(0.5, this.scale() + delta));
    this.scale.set(next);
    if (next <= 1) { this.translateX.set(0); this.translateY.set(0); }
  }

  private resetView() {
    this.scale.set(1);
    this.translateX.set(0);
    this.translateY.set(0);
  }

  // Mouse drag
  onMouseDown(event: MouseEvent) {
    if (event.button !== 0) return;
    this.isDragging  = true;
    this.dragStartX  = event.clientX;
    this.dragStartY  = event.clientY;
    this.dragOriginX = this.translateX();
    this.dragOriginY = this.translateY();
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging || !this.lightboxSrc()) return;
    this.translateX.set(this.dragOriginX + event.clientX - this.dragStartX);
    this.translateY.set(this.dragOriginY + event.clientY - this.dragStartY);
  }

  @HostListener('document:mouseup')
  onMouseUp() { this.isDragging = false; }

  // Touch drag
  onTouchStart(event: TouchEvent) {
    if (event.touches.length !== 1) return;
    this.isDragging  = true;
    this.dragStartX  = event.touches[0].clientX;
    this.dragStartY  = event.touches[0].clientY;
    this.dragOriginX = this.translateX();
    this.dragOriginY = this.translateY();
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isDragging || event.touches.length !== 1) return;
    event.preventDefault();
    this.translateX.set(this.dragOriginX + event.touches[0].clientX - this.dragStartX);
    this.translateY.set(this.dragOriginY + event.touches[0].clientY - this.dragStartY);
  }

  onTouchEnd() { this.isDragging = false; }
}
