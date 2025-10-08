import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Prague as default city
    router.replace('/cz/hypotecni-kalkulacka/praha');
  }, [router]);

  return null;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

