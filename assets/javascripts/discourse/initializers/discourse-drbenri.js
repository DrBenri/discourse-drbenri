import { withPluginApi } from 'discourse/lib/plugin-api';

function initializePlugin(api)
{
  api.onPageChange((url, title) => {
        //topic page url: /t/2016-olympics-what-rio-doesn-t-want-the-world-to-see/38
        const topicUrl = url.match(/\/t\/([^\/]+)\/(\d+)/);
        if (topicUrl) {
          //play video on topic page
          const videoElement = document.querySelector(".video-placeholder-container");
          videoElement.click();

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
          }, 300);
      } else {
        // enable right click on videos
        document.removeEventListener('contextmenu', function(event) {
          event.preventDefault();
        });
      }
  });
}

export default {
  name: 'discourse-drbenri',
  initialize: function(container)
  {
    withPluginApi('0.1', api => initializePlugin(api));
  }
};
