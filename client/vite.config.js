import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // ✅ you imported it

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],  // ✅ you need this to process JSX
  server: {
    port: 3005,
  },
});
