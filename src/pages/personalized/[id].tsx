// pages/personalized/[id].tsx
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function PersonalizedPage({ session }) {
  const router = useRouter();
  const { id } = router.query;

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Personalized Page for {session.user.email}</h1>
      {/* Display personalized content here */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
