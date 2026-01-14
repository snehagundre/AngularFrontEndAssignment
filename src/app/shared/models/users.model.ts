
export interface User {
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  company: { name: string };
  status: 'Active' | 'Inactive';
}
