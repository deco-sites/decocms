export interface Props {
  stat1Value?: string;
  stat1Label?: string;
  stat1Eyebrow?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat2Eyebrow?: string;
  stat3Value?: string;
  stat3Label?: string;
  stat3Eyebrow?: string;
}

export default function StatsCarousel({
  stat1Value,
  stat1Label,
  stat1Eyebrow,
  stat2Value,
  stat2Label,
  stat2Eyebrow,
  stat3Value,
  stat3Label,
  stat3Eyebrow,
}: Props) {
  const stats = [
    { value: stat1Value, label: stat1Label, eyebrow: stat1Eyebrow },
    { value: stat2Value, label: stat2Label, eyebrow: stat2Eyebrow },
    { value: stat3Value, label: stat3Label, eyebrow: stat3Eyebrow },
  ].filter((stat) => stat.value);

  if (stats.length === 0) return null;

  // Calculate approximate total width for animation
  // Each stat block is roughly 150px wide, divider is 1px, gap is 40px
  const statBlockWidth = 150;
  const dividerWidth = 1;
  const gapWidth = 40;
  const singleSetWidth = stats.length * statBlockWidth + (stats.length - 1) * (dividerWidth + gapWidth);
  const animationDuration = 30; // seconds for full cycle

  // Create array with stats and dividers
  const renderStatSet = (prefix: string) => {
    const elements: JSX.Element[] = [];
    stats.forEach((stat, index) => {
      elements.push(
        <div key={`${prefix}-stat-${index}`} class="flex flex-col gap-2 flex-shrink-0">
          {stat.eyebrow && (
            <span class="font-mono text-dc-500 text-xs uppercase leading-5 whitespace-nowrap">
              {stat.eyebrow}
            </span>
          )}
          <span class="text-dc-900 text-[32px] font-medium leading-none tracking-[-0.64px]">
            {stat.value}
          </span>
          <span class="text-dc-500 text-lg lg:text-xl font-normal leading-[1.4] whitespace-nowrap">
            {stat.label}
          </span>
        </div>
      );
      
      if (index < stats.length - 1) {
        elements.push(
          <div key={`${prefix}-divider-${index}`} class="w-px h-[100px] flex-shrink-0" style="background-color: #D6D3D1;" />
        );
      }
    });
    return elements;
  };

  return (
    <div class="relative w-full overflow-hidden">
      <div
        class="flex items-start gap-10"
        style={{
          animation: `slideStatsHorizontal ${animationDuration}s linear infinite`,
        }}
      >
        {/* First set of stats */}
        {renderStatSet("first")}
        
        {/* Second set of stats (for seamless infinite loop) */}
        {renderStatSet("second")}
      </div>

      <style>
        {`
          @keyframes slideStatsHorizontal {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${singleSetWidth}px);
            }
          }
        `}
      </style>
    </div>
  );
}

