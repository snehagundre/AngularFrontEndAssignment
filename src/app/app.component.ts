import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container" [class.sidebar-open]="isMobileSidebarOpen">
      <!-- Sidebar Navigation -->
      <app-side-bar 
        [isCollapsed]="isSidebarCollapsed"
        (toggleSidebar)="onToggleSidebar()">
      </app-side-bar>
      
      <!-- Main Content Area -->
      <main class="main-content" [class.sidebar-collapsed]="isSidebarCollapsed">
        <!-- Mobile Toggle Button -->
        <button *ngIf="isMobile" mat-icon-button class="mobile-toggle-btn" (click)="toggleMobileSidebar()">
          <mat-icon>menu</mat-icon>
        </button>
        
        <!-- Router Outlet for Pages -->
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSidebarCollapsed = false;
  isMobile = false;
  isMobileSidebarOpen = false;

  constructor() { }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  /**
   * Checks screen size and adjusts sidebar accordingly
   */
  private checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.isMobileSidebarOpen = false;
    }
  }

  /**
   * Toggles sidebar collapse state
   */
  onToggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  /**
   * Toggles mobile sidebar
   */
  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }
}