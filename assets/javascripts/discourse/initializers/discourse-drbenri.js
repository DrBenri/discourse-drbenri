import { withPluginApi } from 'discourse/lib/plugin-api';

function initializePlugin(api)
{
  api.onPageChange((url, title) => {
        //topic page url: /t/2016-olympics-what-rio-doesn-t-want-the-world-to-see/38
        const topicUrl = url.match(/\/t\/([^\/]+)\/(\d+)/);
        console.log(topicUrl);
        if (topicUrl) {
          //play video on topic page
          const videoElement = document.querySelector(".video-placeholder-container");
          log(videoElement);
          videoElement.click();

          setTimeout(() => {
            //autoplay videos
            const videos = document.querySelectorAll('video');
            log(videos);
            videos.forEach(video => video.muted = true);
            //disable right click on videos
            document.addEventListener('contextmenu', function(event) {
              event.preventDefault();
            });
          }, 300);
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
