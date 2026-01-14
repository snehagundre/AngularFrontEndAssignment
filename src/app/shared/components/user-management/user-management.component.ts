import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { User, UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminDetailComponent } from '../admin-detail/admin-detail.component';
import { CreateStaffComponent } from '../create-staff/create-staff.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {


   // Component State
  isLoading = true;
  error: string | null = null;
  
  // Data
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  
  // Filters
  searchQuery = '';
  activeTab: 'all' | 'active' | 'inactive' = 'all';
  selectedRole: 'all' | 'admin' | 'staff' | 'student' = 'all';
  
  // Statistics
  stats = {
    totalAdmins: 0,
    totalStaff: 0,
    totalStudents: 0,
    activeUsers: 0,
    inactiveUsers: 0
  };

  // Hostel Info (from screenshot)
  currentHostel = {
    name: 'GHREO BOYS HOSTEL',
    location: 'Shraddha Park, Nagpur'
  };

  @ViewChild('addUserMenu') addUserMenu!: TemplateRef<any>;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Loads users from the service
   */
  loadUsers(): void {
    this.isLoading = true;
    this.error = null;
    
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = [...users];
        this.calculateStatistics();
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users. Please try again.';
        this.isLoading = false;
        console.error('Error loading users:', err);
        this.showSnackbar('Error loading users', 'error');
      }
    });
  }

  /**
   * Calculates user statistics
   */
  calculateStatistics(): void {
    this.stats = {
      totalAdmins: this.users.filter(u => u.role === 'admin').length,
      totalStaff: this.users.filter(u => u.role === 'staff').length,
      totalStudents: this.users.filter(u => u.role === 'student').length,
      activeUsers: this.users.filter(u => u.status === 'active').length,
      inactiveUsers: this.users.filter(u => u.status === 'inactive').length
    };
  }

  /**
   * Applies all active filters to the user list
   */
  applyFilters(): void {
    let filtered = [...this.users];
    
    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (this.activeTab !== 'all') {
      filtered = filtered.filter(user => user.status === this.activeTab);
    }
    
    // Apply role filter
    if (this.selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === this.selectedRole);
    }
    
    this.filteredUsers = filtered;
  }

  /**
   * Handles search input changes
   */
  onSearch(): void {
    this.applyFilters();
  }

  /**
   * Changes the active status filter tab
   * @param tab - The tab to activate
   */
  setActiveTab(tab: 'all' | 'active' | 'inactive'): void {
    this.activeTab = tab;
    this.applyFilters();
  }

  /**
   * Changes the role filter
   * @param role - The role to filter by
   */
  setRoleFilter(role: 'all' | 'admin' | 'staff' | 'student'): void {
    this.selectedRole = role;
    this.applyFilters();
  }

  /**
   * Opens admin details modal
   * @param user - The user to view details for
   */
  openAdminDetails(user: User): void {
    this.selectedUser = user;
    
    const dialogRef = this.dialog.open(AdminDetailComponent, {
      width: '800px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: { user: this.selectedUser },
      panelClass: 'admin-details-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selectedUser = null;
      if (result === 'refresh') {
        this.loadUsers();
      }
    });
  }
  getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

  /**
   * Opens create staff modal
   */
  openCreateStaffModal(): void {
    const dialogRef = this.dialog.open(CreateStaffComponent, {
      width: '600px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'create-staff-modal'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showSnackbar('Staff created successfully!', 'success');
        // In a real application, you would refresh the user list here
      }
    });
  }

  /**
   * Exports user data
   */
  exportData(): void {
    this.showSnackbar('Exporting user data...', 'info');
    // In a real application, implement export functionality
    console.log('Exporting data:', this.filteredUsers);
  }

  /**
   * Generates report
   */
  generateReport(): void {
    this.showSnackbar('Generating report...', 'info');
    // In a real application, implement report generation
    console.log('Generating report for:', this.filteredUsers);
  }

  /**
   * Shows snackbar notification
   * @param message - The message to display
   * @param type - The type of notification
   */
  private showSnackbar(message: string, type: 'success' | 'error' | 'info'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [`snackbar-${type}`]
    });
  }

}
