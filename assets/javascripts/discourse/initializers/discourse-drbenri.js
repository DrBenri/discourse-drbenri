import { withPluginApi } from 'discourse/lib/plugin-api';

function initializePlugin(api)
{
  api.onPageChange((url, title) => {
        //topic page url: /t/2016-olympics-what-rio-doesn-t-want-the-world-to-see/38
        const topicUrl = url.match(/\/t\/([^\/]+)\/(\d+)/);
        if (topicUrl) {
          //autoplay videos and disable right click to video
          document.addEventListener('DOMContentLoaded', function() {
            //autoplay videos
            const videos = document.querySelectorAll('video');
            videos.forEach(video => video.muted = true);
            //disable right click on videos
            document.addEventListener('contextmenu', function(event) {
              event.preventDefault();
            });
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
