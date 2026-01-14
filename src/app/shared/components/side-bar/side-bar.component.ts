import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface MenuItem {
  id: string;
  name: string;
  icon: string;
  isActive: boolean;
  hasSubMenu?: boolean;
  subItems?: MenuItem[];
}
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
@Input() isCollapsed = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  // Menu items based on provided screenshot
  menuItems: MenuItem[] = [
    { id: 'dashboard', name: 'Dashboard', icon: 'dashboard', isActive: false },
    { id: 'reports', name: 'Reports & Analytics', icon: 'assessment', isActive: false },
    { id: 'users', name: 'Users', icon: 'people', isActive: true, 
      subItems: [
        { id: 'emergency', name: 'Emergency', icon: 'emergency', isActive: false },
        { id: 'complaints', name: 'Complaints', icon: 'feedback', isActive: false },
        { id: 'attendance', name: 'Attendance', icon: 'check_circle', isActive: false },
        { id: 'leaves', name: 'Leaves', icon: 'event_note', isActive: false },
        { id: 'hostel-mess', name: 'Hostel Mess', icon: 'restaurant', isActive: false },
        { id: 'fees', name: 'Fees', icon: 'payments', isActive: false },
        { id: 'amenities', name: 'Amenities', icon: 'home_work', isActive: false },
        { id: 'inventory', name: 'Inventory', icon: 'inventory', isActive: false },
        { id: 'visitors', name: 'Visitors', icon: 'person_add', isActive: false },
        { id: 'community', name: 'Community', icon: 'forum', isActive: false },
        { id: 'laundry', name: 'Laundry', icon: 'local_laundry_service', isActive: false },
        { id: 'rooms', name: 'Rooms Allocation', icon: 'meeting_room', isActive: false },
        { id: 'parcel', name: 'Parcel', icon: 'package', isActive: false }
      ]
    }
  ];

  expandedMenu: string | null = 'users'; // Users menu expanded by default

  constructor() { }

  ngOnInit(): void {
    // Set Users as active based on screenshot
    this.setActiveMenu('users');
  }

  /**
   * Sets the active menu item
   * @param menuId - ID of the menu item to activate
   */
  setActiveMenu(menuId: string): void {
    this.menuItems.forEach(item => {
      item.isActive = item.id === menuId;
    });
  }

  /**
   * Toggles submenu expansion
   * @param menuId - ID of the menu item to toggle
   */
  toggleSubMenu(menuId: string): void {
    this.expandedMenu = this.expandedMenu === menuId ? null : menuId;
  }

  /**
   * Handles menu item click
   * @param menuId - ID of the clicked menu item
   */
  onMenuItemClick(menuId: string): void {
    this.setActiveMenu(menuId);
    // In a real application, you would navigate to the corresponding route
    console.log(`Navigating to: ${menuId}`);
  }

  /**
   * Toggles sidebar collapse state
   */
  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

}
