import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // Remove the blinking caret that appears after a plain click on non-editable text.
  // A collapsed selection means only the caret was placed (no text highlighted),
  // so we discard it. Drag-to-select and Ctrl+A are unaffected because those
  // produce a non-collapsed selection that this listener leaves alone.
  @HostListener('document:mouseup', ['$event'])
  clearCaret(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    const editable = target.closest('input, textarea, [contenteditable="true"]');
    if (editable) return;
    const sel = window.getSelection();
    if (sel?.isCollapsed) sel.removeAllRanges();
  }
}
