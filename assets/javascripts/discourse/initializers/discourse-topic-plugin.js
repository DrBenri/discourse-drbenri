import { withPluginApi } from "discourse/lib/plugin-api";

function initializeVideoAutoplay(api) {
  console.log('initializeVideoAutoplay');
  api.onPageChange(() => {
    console.log('onPageChange');
    document.querySelectorAll('video').forEach(video => {
      console.log('video', video);
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
  name: 'discourse-topic-plugin',
  initialize() {
    withPluginApi('0.8.32', (api) => initializeVideoAutoplay(api));
  }
};
