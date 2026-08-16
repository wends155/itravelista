import { execSync, spawn } from 'child_process';

const TIMEOUT_CHECK_MS = 3000;
const TIMEOUT_START_MS = 20000;

function isDockerRunning() {
  try {
    execSync('docker info', { stdio: 'ignore', timeout: TIMEOUT_CHECK_MS });
    return true;
  } catch {
    return false;
  }
}

function isSupabaseRunning() {
  try {
    execSync('npx supabase status', { stdio: 'ignore', timeout: TIMEOUT_CHECK_MS });
    return true;
  } catch {
    return false;
  }
}

console.log('🚀 [dev] Initializing ITravelista PH development environment...');

if (isDockerRunning()) {
  console.log('🐳 [dev] Docker Desktop is active!');
  if (!isSupabaseRunning()) {
    console.log('⚡ [dev] Starting local Supabase containers (timeout: 20s)...');
    try {
      execSync('npx supabase start', { stdio: 'inherit', timeout: TIMEOUT_START_MS });
    } catch (err) {
      console.warn('⚠️ [dev] Supabase start timed out or skipped. Falling back to Guest mode.');
    }
  } else {
    console.log('✅ [dev] Local Supabase is active.');
  }

  try {
    execSync('node scripts/setup-local-env.mjs', { stdio: 'inherit', timeout: TIMEOUT_CHECK_MS });
  } catch {
    // ignore
  }
} else {
  console.log('ℹ️ [dev] Docker not active or timed out — Next.js launching in Guest Mode.');
}

console.log('🌐 [dev] Launching Next.js dev server...');
const nextDev = spawn('npx', ['next', 'dev', '--turbopack'], {
  stdio: 'inherit',
  shell: true,
});

nextDev.on('close', (code) => {
  process.exit(code ?? 0);
});
