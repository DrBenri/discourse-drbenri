import { withPluginApi } from 'discourse/lib/plugin-api';

function initializeVideoAutoplay(api) {
  log('initializeVideoAutoplay');
  api.onPageChange(() => {
    log('onPageChange');
    document.querySelectorAll('video').forEach(video => {
      log('video', video);
      // Set video to autoplay, mute, and loop
      video.setAttribute('autoplay', true);
      video.setAttribute('muted', true);
      video.setAttribute('loop', true);

      // Disable right-click context menu
      video.addEventListener('contextmenu', function(e) {
        e.preventDefault();
      });
    });
  });
}

export default {
  name: 'video-autoplay',
  initialize() {
    withPluginApi('0.8.31', (api) => initializeVideoAutoplay(api));
  }
};
