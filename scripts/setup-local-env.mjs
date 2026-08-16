import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const envPath = path.join(rootDir, '.env.local');
const TIMEOUT_CHECK_MS = 3000;

try {
  const rawStatus = execSync('npx supabase status --output json', {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
    timeout: TIMEOUT_CHECK_MS,
  });
  const status = JSON.parse(rawStatus);

  const apiUrl = status.API_URL || 'http://localhost:54321';
  const anonKey = status.ANON_KEY || status.GRAPHQL_PUBLIC_ANON_KEY || '';
  const serviceKey = status.SERVICE_ROLE_KEY || '';

  if (!anonKey) {
    console.log('⚠️ [env:setup] Supabase is running but anon key could not be parsed.');
    process.exit(0);
  }

  let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';

  const updates = {
    NEXT_PUBLIC_SUPABASE_URL: apiUrl,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey,
    SUPABASE_SERVICE_ROLE_KEY: serviceKey,
    NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  };

  for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
      envContent += `\n${key}=${value}`;
    }
  }

  fs.writeFileSync(envPath, envContent.trim() + '\n', 'utf8');
  console.log('✅ [env:setup] Synced local Supabase keys to .env.local');
} catch {
  console.log('ℹ️ [env:setup] Supabase is not running locally — keeping existing .env.local');
}
