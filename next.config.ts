import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Next.js doesn't infer the parent due to multiple lockfiles
  outputFileTracingRoot: join(__dirname),
  /* config options here */
};

export default nextConfig;
