import type { ComponentChildren } from "preact";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { PodcastEpisode, PodcastPlatform } from "../types/podcast.ts";

export interface Props {
  /**
   * @title Podcast Episodes
   * @description List of podcast episodes
   */
  episodes?: PodcastEpisode[];
  /**
   * @title Podcast Platforms
   * @description Platform links (Apple, Spotify, etc.)
   */
  platforms?: PodcastPlatform[];
}

function Container({ children }: {
  children: ComponentChildren;
}) {
  return (
    <div class="w-full bg-dc-50 px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16 flex flex-col justify-start items-center gap-8 lg:gap-16">
      <div class="w-full max-w-[1440px] mx-auto flex flex-col justify-start items-center gap-8 lg:gap-16">
        {children}
      </div>
    </div>
  );
}

function YouTubeEmbed({ videoId, title, thumbnail }: { videoId: string; title: string; thumbnail?: ImageWidget }) {
  const handlePlay = () => {
    // Replace thumbnail with actual iframe when clicked
    const container = document.getElementById(`youtube-${videoId}`);
    if (container) {
      container.innerHTML = `
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/${videoId}?autoplay=1"
          title="${title}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="w-full h-full rounded-2xl"
        ></iframe>
      `;
    }
  };

  return (
    <div 
      id={`youtube-${videoId}`}
      class="self-stretch aspect-video rounded-2xl overflow-hidden relative cursor-pointer group"
      onClick={handlePlay}
    >
      {/* Custom Thumbnail or YouTube fallback */}
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={title}
          width={1312}
          height={738}
          class="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={title}
          class="w-full h-full object-cover"
          loading="lazy"
        />
      )}
      
      {/* Play Button Overlay */}
      <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200">
        <div class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-200">
          <svg 
            class="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white ml-1" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function EpisodeBadge({ episodeNumber }: { episodeNumber: number }) {
  return (
    <div class="px-4 py-1 bg-dc-50 rounded-full outline outline-1 outline-offset-[-1px] outline-dc-200 flex justify-center items-center gap-2">
      <div class="justify-center text-dc-600 text-base font-semibold leading-tight">
        Episode • {episodeNumber}
      </div>
    </div>
  );
}

function FeaturedEpisode({ episode }: { episode: PodcastEpisode }) {
  return (
    <div class="self-stretch flex flex-col justify-start items-center gap-8">
      <div class="self-stretch flex justify-start items-start">
        <div class="flex-1 flex flex-col justify-start items-start">
          {episode.youtubeVideoId ? (
            <YouTubeEmbed 
              videoId={episode.youtubeVideoId} 
              title={episode.title}
              thumbnail={episode.thumbnail}
            />
          ) : (
            <div class="self-stretch aspect-video bg-dc-300 rounded-2xl flex items-center justify-center">
              <div class="text-dc-600 text-xl font-medium">
                No video available
              </div>
            </div>
          )}
          <div class="self-stretch py-6 flex flex-col justify-start items-start gap-4">
            <div class="inline-flex justify-start items-start gap-2">
              <EpisodeBadge episodeNumber={episode.episodeNumber} />
            </div>
            <div class="self-stretch flex flex-col justify-start items-start gap-2">
                              <div class="self-stretch text-dc-800 text-2xl md:text-3xl font-semibold leading-8 md:leading-10">
                {episode.title}
              </div>
              {episode.guestName && (
                                  <div class="self-stretch text-dc-400 text-xl md:text-2xl font-semibold leading-6 md:leading-7">
                  {episode.guestName}
                  {episode.guestTitle && ` (${episode.guestTitle})`}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EpisodeCard({ episode }: { episode: PodcastEpisode }) {
  const handleCardClick = () => {
    if (episode.youtubeUrl) {
      globalThis.open(episode.youtubeUrl, '_blank');
    }
  };

  return (
    <div 
      class="flex flex-col justify-start items-start cursor-pointer hover:opacity-90 transition-opacity"
      onClick={handleCardClick}
    >
      <div class="self-stretch h-48 md:h-56 lg:h-72 bg-dc-300 rounded-2xl flex items-center justify-center overflow-hidden">
        {episode.thumbnail ? (
          <Image 
            src={episode.thumbnail} 
            alt={episode.title}
            width={416}
            height={288}
            class="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div class="text-dc-600 text-lg font-medium">
            Episode {episode.episodeNumber}
          </div>
        )}
      </div>
      <div class="self-stretch py-4 md:py-6 flex flex-col justify-start items-start gap-3 md:gap-4">
        <div class="inline-flex justify-start items-start gap-2">
          <EpisodeBadge episodeNumber={episode.episodeNumber} />
        </div>
        <div class="self-stretch text-dc-800 text-lg md:text-xl lg:text-2xl font-semibold leading-6 md:leading-7">
          {episode.title}
        </div>
        {episode.guestName && (
          <div class="self-stretch text-dc-400 text-base md:text-lg font-medium leading-5 md:leading-6">
            {episode.guestName}
            {episode.guestTitle && ` (${episode.guestTitle})`}
          </div>
        )}
      </div>
    </div>
  );
}

function PlatformButton({ platform }: { platform: PodcastPlatform }) {
  const handleClick = () => {
    globalThis.open(platform.url, '_blank');
  };

  const getIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'apple':
        return (
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.0156 29.1847C26.9115 30.8342 25.7409 32.4437 23.9584 32.4703C22.1759 32.5102 21.6039 31.4195 19.582 31.4195C17.5467 31.4195 16.9215 32.4437 15.2321 32.5102C13.4895 32.5768 12.1726 30.7544 11.0552 29.1448C8.7805 25.8591 7.03791 19.8066 9.3791 15.7361C10.5364 13.7142 12.6115 12.4372 14.8596 12.3973C16.5624 12.3707 18.1852 13.5546 19.2361 13.5546C20.2737 13.5546 22.2424 12.1312 24.3043 12.344C25.1689 12.384 27.5899 12.6899 29.1463 14.9779C29.0266 15.0577 26.2597 16.6806 26.2863 20.046C26.3262 24.0633 29.8114 25.4069 29.8513 25.4202C29.8114 25.5133 29.2926 27.3357 28.0156 29.1847ZM20.42 7.9011C21.3911 6.79701 23.0006 5.95897 24.3309 5.90576C24.5038 7.46212 23.8786 9.03179 22.9474 10.1492C22.0296 11.2799 20.5131 12.1578 19.0233 12.0381C18.8237 10.5083 19.5687 8.91207 20.42 7.9011Z" fill="#282524"/>
          </svg>
        );
      case 'spotify':
        return (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1068_1374)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1694 9.98472C13.6912 7.91915 7.95313 7.72895 4.6314 8.73691C4.09828 8.89771 3.53495 8.59767 3.37307 8.06347C3.21119 7.53035 3.51228 6.967 4.0454 6.80512C7.85817 5.64716 14.1952 5.87045 18.2 8.2479C18.6792 8.53281 18.8367 9.1525 18.5518 9.63166C18.2691 10.1108 17.6475 10.2696 17.1694 9.98472ZM17.0561 13.0442C16.8122 13.4402 16.2942 13.5642 15.8981 13.3213C12.9983 11.5385 8.57583 11.0226 5.1451 12.064C4.69939 12.1979 4.22995 11.9475 4.09505 11.5028C3.96123 11.0582 4.2116 10.5886 4.65622 10.4537C8.57475 9.26444 13.4473 9.84083 16.7787 11.888C17.1748 12.1309 17.2989 12.6492 17.0561 13.0442ZM15.7351 15.9824C15.5409 16.2997 15.1276 16.4001 14.8103 16.2058C12.2764 14.6572 9.08628 14.3077 5.32964 15.1657C4.96811 15.2487 4.60658 15.0219 4.52456 14.6593C4.44146 14.2977 4.66702 13.9377 5.0307 13.8546C9.14132 12.9146 12.667 13.3191 15.5118 15.0576C15.829 15.2519 15.9294 15.6651 15.7351 15.9824ZM10.786 0.41748C4.82566 0.41748 -0.00585938 5.249 -0.00585938 11.2093C-0.00585938 17.1697 4.82566 22.0012 10.786 22.0012C16.7463 22.0012 21.5779 17.1697 21.5779 11.2093C21.5779 5.25007 16.7463 0.41748 10.786 0.41748Z" fill="black"/>
            </g>
            <defs>
              <clipPath id="clip0_1068_1374">
                <rect width="21.5837" height="21.5837" fill="white" transform="translate(-0.00585938 0.41748)"/>
              </clipPath>
            </defs>
          </svg>
        );
      default:
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-8c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1zm6 0c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1z" fill="currentColor"/>
          </svg>
        );
    }
  };

  return (
    <div 
      class="px-4 md:px-6 lg:px-7 py-3 md:py-4 lg:py-5 bg-dc-200 rounded-2xl lg:rounded-3xl flex justify-center items-center gap-2 md:gap-3 lg:gap-3.5 cursor-pointer hover:bg-dc-300 transition-colors"
      onClick={handleClick}
    >
      <div class="w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9 relative overflow-hidden flex items-center justify-center">
        {getIcon(platform.name)}
      </div>
      <div class="text-dc-800 text-lg md:text-xl lg:text-2xl font-medium leading-6 md:leading-8 lg:leading-9">
        {platform.name}
      </div>
    </div>
  );
}

export default function Podcasts({
  episodes = [],
  platforms = [
    { name: "Apple", url: "https://podcasts.apple.com", icon: "apple" },
    { name: "Spotify", url: "https://open.spotify.com", icon: "spotify" }
  ]
}: Props) {
  // Get featured episode (first one or one marked as featured)
  const featuredEpisode = episodes.find(ep => ep.featured) || episodes[0];
  
  // Get regular episodes (exclude featured)
  const regularEpisodes = episodes.filter(ep => ep !== featuredEpisode);

  return (
    <Container>
      {/* Header */}
      <div class="self-stretch flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-0">
        <div class="text-dc-800 text-4xl md:text-5xl lg:text-7xl font-medium leading-tight lg:leading-[80px]">
          Tune in to deco.cast
        </div>
        <div class="flex justify-start items-center gap-2">
          {platforms.map((platform) => (
            <PlatformButton key={platform.name} platform={platform} />
          ))}
        </div>
      </div>

      {/* Featured Episode */}
      {featuredEpisode && (
        <FeaturedEpisode episode={featuredEpisode} />
      )}

      {/* Episode Grid */}
      {regularEpisodes.length > 0 && (
        <div class="self-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {regularEpisodes.map((episode) => (
            <EpisodeCard key={episode.episodeNumber} episode={episode} />
          ))}
        </div>
      )}
    </Container>
  );
}