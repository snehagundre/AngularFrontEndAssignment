import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  status: 'active' | 'inactive';
  role: 'admin' | 'staff' | 'student';
  hostelAssigned: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
 private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  // Mock data for demonstration
  private mockUsers: User[] = [
    {
      id: 1,
      name: 'Pratap Mude',
      username: 'pratapm',
      email: 'pratap.mude@gmail.com',
      phone: '+91 7834744378',
      website: 'yocostays.com',
      company: {
        name: 'YOCO Stays',
        catchPhrase: 'Best Hostel Management',
        bs: 'hostel-management'
      },
      address: {
        street: '22/D, Shankar Nagar',
        suite: 'Apt. 101',
        city: 'Nagpur',
        zipcode: '440010',
        geo: { lat: '21.1458', lng: '79.0882' }
      },
      status: 'active',
      role: 'admin',
      hostelAssigned: 'Shraddha Park'
    },
    {
      id: 2,
      name: 'Rahul Sharma',
      username: 'rahuls',
      email: 'rahul.sharma@yocostays.com',
      phone: '+91 9876543210',
      website: 'yocostays.com',
      company: {
        name: 'YOCO Stays',
        catchPhrase: 'Hostel Management Experts',
        bs: 'hospitality'
      },
      address: {
        street: '45, Civil Lines',
        suite: 'Apt. 202',
        city: 'Nagpur',
        zipcode: '440001',
        geo: { lat: '21.1458', lng: '79.0882' }
      },
      status: 'active',
      role: 'staff',
      hostelAssigned: 'Saikheda'
    }
  ];

  constructor(private http: HttpClient) { }

  /**
   * Fetches users from API with error handling
   * @returns Observable of User array
   */
  getUsers(): Observable<User[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(apiUsers => {
        // Transform API users to our User model
        return apiUsers.map((apiUser, index) => {
          const mockUser = this.mockUsers[index] || this.mockUsers[0];
          return {
            id: apiUser.id,
            name: apiUser.name,
            username: apiUser.username,
            email: apiUser.email,
            phone: apiUser.phone,
            website: apiUser.website,
            company: apiUser.company,
            address: apiUser.address,
            status: index % 2 === 0 ? 'active' : 'inactive',
            role: index === 0 ? 'admin' : (index % 3 === 0 ? 'staff' : 'student'),
            hostelAssigned: ['Shraddha Park', 'Saikheda', 'GHRU'][index % 3]
          } as User;
        });
      }),
      catchError(error => {
        console.error('Error fetching users from API, using mock data:', error);
        // Return mock data as fallback
        return of(this.mockUsers).pipe(delay(500));
      })
    );
  }

  /**
   * Gets user by ID
   * @param id - User ID
   * @returns Observable of User
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(apiUser => {
        const mockUser = this.mockUsers.find(u => u.id === id) || this.mockUsers[0];
        return {
          id: apiUser.id,
          name: apiUser.name,
          username: apiUser.username,
          email: apiUser.email,
          phone: apiUser.phone,
          website: apiUser.website,
          company: apiUser.company,
          address: apiUser.address,
          status: mockUser.status,
          role: mockUser.role,
          hostelAssigned: mockUser.hostelAssigned
        } as User;
      }),
      catchError(error => {
        console.error('Error fetching user:', error);
        const mockUser = this.mockUsers.find(u => u.id === id) || this.mockUsers[0];
        return of(mockUser).pipe(delay(300));
      })
    );
  }

  /**
   * Searches users by name or email
   * @param query - Search query
   * @returns Observable of filtered users
   */
  searchUsers(query: string): Observable<User[]> {
    return this.getUsers().pipe(
      map(users => {
        if (!query.trim()) return users;
        
        const searchTerm = query.toLowerCase();
        return users.filter(user =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.username.toLowerCase().includes(searchTerm)
        );
      })
    );
  }

  /**
   * Filters users by status
   * @param status - Status to filter by
   * @returns Observable of filtered users
   */
  filterByStatus(status: 'all' | 'active' | 'inactive'): Observable<User[]> {
    return this.getUsers().pipe(
      map(users => {
        if (status === 'all') return users;
        return users.filter(user => user.status === status);
      })
    );
  }
}