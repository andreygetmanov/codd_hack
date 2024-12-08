import React from "react";

type VideoPlayerProps = {
  src: string; // Источник видео
  poster?: string; // Постер для отображения до загрузки видео
  autoplay?: boolean; // Воспроизводить автоматически
  muted?: boolean; // Воспроизводить без звука
  playsInline?: boolean; // Inline-проигрывание (для мобильных устройств)
  type?: string; // Тип MIME, например, video/mp4
  className?: string; // Дополнительные CSS классы
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoplay = false,
  muted = false,
  playsInline = false,
  type = "video/mp4",
  className = "",
}) => {
  return (
    <video
      className={className}
      poster={poster}
      autoPlay={autoplay}
      muted={muted}
      playsInline={playsInline}
      controls
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;