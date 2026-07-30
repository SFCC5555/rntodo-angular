const fs = require('fs');
const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_KEY || '';
const content = `export const environment = { production: true, supabaseUrl: '${url}', supabaseKey: '${key}' };\n`;
fs.writeFileSync('src/environments/environment.prod.ts', content);
fs.writeFileSync('src/environments/environment.ts', content);
