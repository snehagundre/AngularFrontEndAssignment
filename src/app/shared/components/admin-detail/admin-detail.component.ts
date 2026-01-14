import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface AdminDetailsData {
  user: User;
}
@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.scss']
})

export class AdminDetailComponent implements OnInit {

   user: User;
  isActive: boolean = true;
  uploadedFiles: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<AdminDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminDetailsData,
    private snackBar: MatSnackBar
  ) {
    this.user = data.user;
    this.isActive = this.user.status === 'active';
  }

  ngOnInit(): void {
    console.log('Admin details loaded for:', this.user.name);
  }

  /**
   * Closes the modal
   */
  onClose(): void {
    this.dialogRef.close();
  }

  /**
   * Goes back (same as close in this context)
   */
  goBack(): void {
    this.onClose();
  }

  /**
   * Handles edit action
   */
  onEdit(): void {
    this.showNotification('Edit functionality would open edit form');
    console.log('Edit admin:', this.user.id);
  }

  /**
   * Toggles user status
   */
  toggleStatus(): void {
    this.isActive = !this.isActive;
    const statusText = this.isActive ? 'activated' : 'deactivated';
    this.showNotification(`User ${statusText} successfully`);
    console.log('Toggle status for:', this.user.id, 'to:', this.isActive ? 'active' : 'inactive');
  }

  /**
   * Handles export action
   */
  onExport(): void {
    this.showNotification('Exporting user data...');
    console.log('Export user:', this.user.id);
  }

  /**
   * Handles report generation
   */
  generateReport(): void {
    this.showNotification('Generating user report...');
    console.log('Generate report for:', this.user.id);
  }

  /**
   * Shows more details
   */
  showMoreDetails(): void {
    this.showNotification('Showing additional details...');
    console.log('More details for:', this.user.id);
  }

  /**
   * Handles file selection for KYC upload
   * @param event - File input change event
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        this.showNotification('Please upload only JPG, PNG or PDF files', 'error');
        return;
      }
      
      if (file.size > maxSize) {
        this.showNotification('File size should be less than 5MB', 'error');
        return;
      }
      
      this.uploadedFiles.push(file);
      this.showNotification(`File "${file.name}" added for upload`);
      
      // Reset input
      input.value = '';
    }
  }

  /**
   * Removes a file from upload list
   * @param index - Index of file to remove
   */
  removeFile(index: number): void {
    const removedFile = this.uploadedFiles.splice(index, 1)[0];
    this.showNotification(`Removed "${removedFile.name}" from upload list`);
  }

  /**
   * Uploads KYC documents
   */
  uploadKYC(): void {
    if (this.uploadedFiles.length === 0) {
      this.showNotification('Please select files to upload', 'error');
      return;
    }
    
    // Simulate upload
    this.showNotification('Uploading KYC documents...', 'info');
    
    setTimeout(() => {
      this.showNotification('KYC documents uploaded successfully!', 'success');
      this.uploadedFiles = [];
    }, 1500);
  }

  /**
   * Shows notification snackbar
   * @param message - Message to display
   * @param type - Type of notification
   */
  private showNotification(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [`snackbar-${type}`]
    });
  }

  /**
   * Gets user initials for avatar
   * @param name - User's full name
   * @returns Initials string
   */
  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  }



}
