import { defineConfig } from 'cypress';

export default defineConfig({
  videosFolder: 'cypress/video',
  video: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'http://localhost:4200',
  },
});
