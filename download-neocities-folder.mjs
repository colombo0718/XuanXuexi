#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';

const API_BASE = 'https://neocities.org/api';

function printUsage() {
  console.log(`
Usage:
  node download-neocities-folder.mjs --dir Card [--out ./neocities-backup]

Auth options:
  --api-key <key>
  --username <name> --password <password>

You can also use environment variables:
  NEOCITIES_API_KEY
  NEOCITIES_USERNAME
  NEOCITIES_PASSWORD

Optional:
  --site-name <sitename>   Override site name used for file downloads
  --site-domain <domain>   Override custom domain used for file downloads
  --dry-run                List files without downloading
  --help                   Show this help
`.trim());
}

function parseArgs(argv) {
  const options = {
    dir: '',
    out: './neocities-backup',
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }

    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }

    if (!arg.startsWith('--')) {
      throw new Error(`Unknown argument: ${arg}`);
    }

    const key = arg.slice(2);
    const value = argv[i + 1];

    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for --${key}`);
    }

    options[key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())] = value;
    i += 1;
  }

  return options;
}

function normalizeDir(dir) {
  const trimmed = dir.replace(/^\/+|\/+$/g, '');
  if (!trimmed) {
    throw new Error('Please provide a non-empty --dir value, for example --dir Card');
  }
  return trimmed;
}

function makeAuthHeaders(options) {
  const apiKey = options.apiKey || process.env.NEOCITIES_API_KEY;
  const username = options.username || process.env.NEOCITIES_USERNAME;
  const password = options.password || process.env.NEOCITIES_PASSWORD;

  if (apiKey) {
    return {
      Authorization: `Bearer ${apiKey}`,
    };
  }

  if (username && password) {
    const encoded = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
    return {
      Authorization: `Basic ${encoded}`,
    };
  }

  throw new Error(
    'Missing auth. Provide --api-key, or --username with --password, or set NEOCITIES_* environment variables.'
  );
}

async function apiGet(endpoint, headers) {
  const response = await fetch(`${API_BASE}${endpoint}`, { headers });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API request failed (${response.status} ${response.statusText}): ${text}`);
  }

  const data = await response.json();
  if (data.result !== 'success') {
    throw new Error(`API returned non-success result: ${JSON.stringify(data)}`);
  }

  return data;
}

function buildDownloadBase(info, options) {
  if (options.siteDomain) {
    return `https://${options.siteDomain.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`;
  }

  const domain = info?.domain;
  if (domain) {
    return `https://${domain.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`;
  }

  const siteName = options.siteName || info?.sitename;
  if (!siteName) {
    throw new Error('Could not determine site name for downloads. Provide --site-name explicitly.');
  }

  return `https://${siteName}.neocities.org`;
}

function filterFiles(files, targetDir) {
  const prefix = `${targetDir}/`;
  return files.filter((file) => !file.is_directory && (file.path === targetDir || file.path.startsWith(prefix)));
}

async function ensureParentDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function downloadFile(url, destination) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Download failed (${response.status} ${response.statusText}) for ${url}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  await ensureParentDir(destination);
  await fs.writeFile(destination, Buffer.from(arrayBuffer));
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printUsage();
    return;
  }

  const targetDir = normalizeDir(options.dir || '');
  const authHeaders = makeAuthHeaders(options);

  const [listData, infoData] = await Promise.all([
    apiGet('/list', authHeaders),
    apiGet('/info', authHeaders),
  ]);

  const files = filterFiles(listData.files || [], targetDir);
  if (files.length === 0) {
    console.log(`No files found under "${targetDir}".`);
    return;
  }

  const downloadBase = buildDownloadBase(infoData.info, options);
  const outputRoot = path.resolve(options.out);

  console.log(`Found ${files.length} file(s) under "${targetDir}".`);
  console.log(`Download base: ${downloadBase}`);
  console.log(`Output root: ${outputRoot}`);

  if (options.dryRun) {
    for (const file of files) {
      console.log(file.path);
    }
    return;
  }

  for (const file of files) {
    const remoteUrl = `${downloadBase}/${file.path.split('/').map(encodeURIComponent).join('/')}`;
    const localPath = path.join(outputRoot, ...file.path.split('/'));
    console.log(`Downloading ${file.path}`);
    await downloadFile(remoteUrl, localPath);
  }

  console.log('Done.');
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
