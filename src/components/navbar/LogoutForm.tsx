import React from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

async function handleSignOut(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  try {
    await Auth.signOut();
    localStorage.removeItem('user'); // Remove user from local storage
    window.location.href = '/auth/sign-in'; // Redirect to sign-in page
  } catch (error) {
    console.error('Error signing out: ', error);
  }
}

export default function LogoutForm() {
  return (
    <form onSubmit={handleSignOut}>
      <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3" type="submit">
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  );
}
