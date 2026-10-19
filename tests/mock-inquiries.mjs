// Local UI test endpoint. Never sends email or forwards submitted data.
import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
let count = 0;
createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }
    if (req.method === 'GET') { res.end(JSON.stringify({ count })); return; }
    for await (const chunk of req) { void chunk; }
    count += 1;
    const failed = existsSync('tests/mock-failure.local');
    res.writeHead(failed ? 503 : 200);
    res.end(JSON.stringify({ success: !failed }));
}).listen(8787, '127.0.0.1', () => console.log('Local mail mock: 127.0.0.1:8787 (no real emails)'));
