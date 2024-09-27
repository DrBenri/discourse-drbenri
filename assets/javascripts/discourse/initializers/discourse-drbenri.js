import { withPluginApi } from 'discourse/lib/plugin-api';

function initializePlugin(api) {
  api.onPageChange((url, title) => {
    // modify styles for subcategory in sidebar
    modifyStylesSubcategory();

    //topic page url: /t/2016-olympics-what-rio-doesn-t-want-the-world-to-see/38
    const topicUrl = url.match(/\/t\/([^\/]+)\/(\d+)/);
    const isMobile = window.innerWidth < 768;
    if (topicUrl) {
      // make sure we are on top of topic page, x = 0, y = 0
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 1000);
      
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

function modifyStylesSubcategory() {
  const elements = document.querySelectorAll('.sidebar-section-link-prefix span');

elements.forEach(element => {
  // Get the computed style for each element
  const style = window.getComputedStyle(element);
  const background = style.backgroundImage;

  // Check if the background is a linear gradient
  const isGradient = background.includes('linear-gradient');
  
  // Use a regex to capture both colors from the gradient
  const colorMatches = background.match(/rgb\(.+?\)/g);

  // Check if there are exactly two colors and if they are different
  const hasTwoColors = colorMatches && colorMatches.length === 2 && colorMatches[0] !== colorMatches[1];

  // Apply padding-left if the background is a gradient and the colors are different
  if (isGradient && hasTwoColors) {
    // move parent element to the right 16px
    element.parentElement.style.paddingLeft = '16px';
  }
});
}

export default {
  name: 'discourse-drbenri',
  initialize: function (container) {
    withPluginApi('0.1', api => initializePlugin(api));
  }
};
