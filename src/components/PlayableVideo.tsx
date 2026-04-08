import React, { useRef } from 'react';
import '../styles/PlayableVideo.css';

interface PlayableVideoProps {
  youtubeUrl: string;
  title?: string;
}

const PlayableVideo = React.forwardRef<HTMLDivElement, PlayableVideoProps>(
  ({ youtubeUrl, title = 'Recipe Video' }, ref) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const getYoutubeVideoId = (url: string): string | null => {
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          return match[1];
        }
      }
      return null;
    };

    const videoId = getYoutubeVideoId(youtubeUrl);

    if (!videoId) {
      return null;
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;

    return (
      <div className="playable-video-container" ref={ref}>
        <div className="playable-video-wrapper">
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="playable-video-iframe"
          />
        </div>
      </div>
    );
  }
);

PlayableVideo.displayName = 'PlayableVideo';

export default PlayableVideo;
