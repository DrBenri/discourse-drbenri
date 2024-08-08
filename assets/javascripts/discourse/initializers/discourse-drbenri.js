import { withPluginApi } from 'discourse/lib/plugin-api';

function initializePlugin(api) {
  api.onPageChange((url, title) => {
    //topic page url: /t/2016-olympics-what-rio-doesn-t-want-the-world-to-see/38
    const topicUrl = url.match(/\/t\/([^\/]+)\/(\d+)/);
    const isMobile = window.innerWidth < 768;
    if (topicUrl) {
      // check app settings for plugin enabled
      const siteSettings = api.container.lookup("service:site-settings");

      // check settings for autoplay: auto_play_video
      // play video on topic page
      if (siteSettings.auto_play_video) {
        const videoElement = document.querySelector(".video-placeholder-container");
        
        if (!videoElement) {
          return;
        }

        videoElement.click();

        // auto play video on mobile
        if (isMobile) {
          setTimeout(() => {
            videoElement.click();
          }, 3000);
        }
      }

      // check settings for disable right click: disable_video_controls
      // disable video controls on topic page
      if (siteSettings.disable_video_controls) {
        setTimeout(() => {
          const videos = document.querySelectorAll('video');

          videos.forEach(video => {
            video.muted = true;
            video.controlsList.add('nodownload');
            video.oncontextmenu = function () {
              return false;
            };
          });

          // Disable right-click on videos only
          document.addEventListener('contextmenu', function (event) {
            if (event.target.tagName === 'VIDEO') {
              event.preventDefault();
            }
          });
        }, 100);
      }
    };
  });
}

export default {
  name: 'discourse-drbenri',
  initialize: function (container) {
    withPluginApi('0.1', api => initializePlugin(api));
  }
};
