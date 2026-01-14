import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
  }
  showAddUserMenu = false;
  showMobileSearch = false;
   showDropdown = false;
  constructor(private elRef: ElementRef) {}

  toggleAddUserMenu() {
    this.showAddUserMenu = !this.showAddUserMenu;
  }

  toggleMobileSearch() {
    this.showMobileSearch = !this.showMobileSearch;
  }

  // 🔹 Close dropdown on outside click
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.showAddUserMenu = false;
    }
  }

 

  toggleDropdown(event : Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  addStaff() {
    console.log('Add Staff clicked');
    this.showDropdown = false;
  }

  addStudent() {
    console.log('Add Student clicked');
    this.showDropdown = false;
  }

  addAdmin() {
    console.log('Add Admin clicked');
    this.showDropdown = false;
  }


}
