import { withPluginApi } from 'discourse/lib/plugin-api';

function initializePlugin(api)
{
  api.onPageChange((url, title) => {
        //topic page url: /t/2016-olympics-what-rio-doesn-t-want-the-world-to-see/38
        const topicUrl = url.match(/\/t\/([^\/]+)\/(\d+)/);
        if (topicUrl) {
          // check app settings for plugin enabled
          const settings = api.container.lookup('site-settings:main');
          const pluginEnabled = settings.get('drbenri_enabled');
          if (!pluginEnabled) return;

          // check settings for autoplay: auto_play_video
          // play video on topic page
          const autoPlayVideo = settings.get('auto_play_video');
          if (autoPlayVideo) {
            const videoElement = document.querySelector(".video-placeholder-container");
            videoElement.click();
          }

          // check settings for disable right click: disable_video_controls
          // disable video controls on topic page
          const disableVideoControls = settings.get('disable_video_controls');
          if (disableVideoControls) {
            const videos = document.querySelectorAll('video');
            setTimeout(() => {
              const videos = document.querySelectorAll('video');
              
              videos.forEach(video => {
                video.muted = true;
                video.controlsList.add('nodownload');
                video.oncontextmenu = function() {
                  return false;
                };
              });
  
              // Disable right-click on videos only
              document.addEventListener('contextmenu', function(event) {
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
  initialize: function(container)
  {
    withPluginApi('0.1', api => initializePlugin(api));
  }
};
