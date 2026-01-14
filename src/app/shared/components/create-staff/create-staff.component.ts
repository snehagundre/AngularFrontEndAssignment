import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.scss']
})
export class CreateStaffComponent implements OnInit {

 staffForm: FormGroup;
  isLoading = false;
  
  // Role options
  roles = [
    { value: 'admin', label: 'Admin', icon: 'admin_panel_settings' },
    { value: 'warden', label: 'Hostel Warden', icon: 'security' },
    { value: 'staff', label: 'Staff', icon: 'people' },
    { value: 'cleaner', label: 'Cleaner', icon: 'cleaning_services' },
    { value: 'cook', label: 'Cook', icon: 'restaurant' }
  ];
  
  // Gender options
  genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateStaffComponent>,
    private snackBar: MatSnackBar
  ) {
    this.staffForm = this.createForm();
  }

  ngOnInit(): void {
    console.log('Create Staff modal initialized');
  }

  /**
   * Creates the staff form with validation
   * @returns FormGroup instance
   */
  private createForm(): FormGroup {
    return this.fb.group({
      role: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s\-\(\)]+$/)]],
      dateOfBirth: ['', Validators.required],
      joiningDate: ['', Validators.required],
      gender: ['', Validators.required],
      fatherName: [''],
      motherName: [''],
      spouseName: ['']
    });
  }

  /**
   * Gets form control for easier access in template
   * @param controlName - Name of the form control
   * @returns Form control
   */
  getFormControl(controlName: string) {
    return this.staffForm.get(controlName);
  }

  /**
   * Handles form submission
   */
  onSubmit(): void {
    if (this.staffForm.invalid) {
      this.markFormGroupTouched(this.staffForm);
      this.showNotification('Please fill all required fields correctly', 'error');
      return;
    }

    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isLoading = false;
      this.showNotification('Staff member created successfully!', 'success');
      this.dialogRef.close(true);
    }, 1500);
    
    console.log('Form submitted:', this.staffForm.value);
  }

  /**
   * Closes the modal
   */
  onCancel(): void {
    if (this.staffForm.dirty) {
      if (confirm('Are you sure? Unsaved changes will be lost.')) {
        this.dialogRef.close();
      }
    } else {
      this.dialogRef.close();
    }
  }

  /**
   * Shows notification
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
   * Marks all form controls as touched to show validation errors
   * @param formGroup - Form group to mark
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
