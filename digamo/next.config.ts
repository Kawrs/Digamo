import { NextConfig } from 'next';

const envVariables = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL as string,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY as string,
};

const nextConfig: NextConfig = {
  env: envVariables,
};

export default nextConfig;