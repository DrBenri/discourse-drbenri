import { withPluginApi } from 'discourse/lib/plugin-api';

function initializePlugin(api)
{
  api.onPageChange((url, title) => {
        //topic page url: /t/2016-olympics-what-rio-doesn-t-want-the-world-to-see/38
        const topicUrl = url.match(/\/t\/([^\/]+)\/(\d+)/);
        if (topicUrl) {
          //play video on topic page
          const videoElement = document.querySelector(".video-placeholder-container");
          console.log(videoElement);
          videoElement.click();

          setTimeout(() => {
            //autoplay videos
            const videos = document.querySelectorAll('video');
            console.log(videos);
            
            //remove download button of videos: controlsList="nodownload" oncontextmenu="return false;"
            videos.forEach(video => {
              video.muted = true;
              video.controlsList.add('nodownload');
              video.oncontextmenu = function() {
                return false;
              };
            });

            // Disable right-click on videos only
            document.addEventListener('contextmenu', function(event) {
              console.log(event);
              if (event.target.tagName === 'VIDEO') {
                 
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
