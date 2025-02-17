import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [

{
  name: 'file-api-plugin',
  configureServer(server) {
    // API to write file
    server.middlewares.use('/api/write_file', (req, res, next) => {
      console.log('server API: write_file');
      if (req.method !== 'PUT') return next();

      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        const { filePath, content } = JSON.parse(body);
        const resolved_path = path.resolve(__dirname, filePath);
        console.log('server API: resolved_path: ' + resolved_path);
        fs.writeFile(resolved_path, content, err => {
          if (err) {
            res.statusCode = 500;
            res.end('Error writing file');
            return;
          }
          res.end('File written successfully');
        });
      });
    });

    // API to read file
    server.middlewares.use('/api/read_file', (req, res, next) => {
      console.log('server API: read_file');
      if (req.method !== 'GET') return next();
      const url = new URL(req.url, `http://${req.headers.host}`);
      const filePath = url.searchParams.get('filePath');
      console.log('filePath: ' + filePath);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end('Error reading file');
          return;
        }
        res.end(data);
      });
    });

    // API to list files in directory
    server.middlewares.use('/api/list_files', (req, res, next) => {
        console.log('server API: list_files');
        if (req.method !== 'GET') return next();
        const url = new URL(req.url, `http://${req.headers.host}`);
        const directoryPath = url.searchParams.get('filePath');
        console.log('directoryPath: ' + directoryPath);

        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.log('server API: list_files error:' + err);
                res.statusCode = 500;
                res.json({ error: 'Error reading directory' });
                return;
            }
            res.end(JSON.stringify(files));
        });
    });
  }
}
,react(), wasm(), topLevelAwait()],
  resolve: {
    alias: {
      '@icon/': new URL('./src/assets/icons/', import.meta.url).pathname,
      '@type/': new URL('./src/types/', import.meta.url).pathname,
      '@store/': new URL('./src/store/', import.meta.url).pathname,
      '@hooks/': new URL('./src/hooks/', import.meta.url).pathname,
      '@constants/': new URL('./src/constants/', import.meta.url).pathname,
      '@api/': new URL('./src/api/', import.meta.url).pathname,
      '@components/': new URL('./src/components/', import.meta.url).pathname,
      '@utils/': new URL('./src/utils/', import.meta.url).pathname,
      '@src/': new URL('./src/', import.meta.url).pathname,
    },
  },
  base: './',
});
