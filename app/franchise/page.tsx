import { redirect } from 'next/navigation';

export default function FranchiseRedirect() {
  // Permanently move users to the Franchise section on the home page
  redirect('/#franchise');
}
