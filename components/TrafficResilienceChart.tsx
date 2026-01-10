import { useRef, useEffect } from "preact/hooks";
import * as echarts from "echarts";

// Use the same primary color as other charts
const PRIMARY_COLOR = "#d0ec1a";
const AZION_COLOR = "#60a5fa"; // Blue (for tooltip only)
const CLOUDFLARE_COLOR = "#f97316"; // Orange (for tooltip only)

interface TrafficDataPoint {
  date: string; // "2025-10-01"
  total: number; // azion + cloudflare (requests/day)
  azion: number;
  cloudflare: number;
}

interface TrafficResilienceChartProps {
  data: TrafficDataPoint[];
  height?: number | string; // Default "100%" for flex containers
}

// Format large numbers as K/M/B
function formatRequests(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
}

export default function TrafficResilienceChart({
  data,
  height = "100%",
}: TrafficResilienceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize chart
    const chart = echarts.init(containerRef.current);
    chartRef.current = chart;

    const option: echarts.EChartsOption = {
      animation: false,
      backgroundColor: "transparent",
      grid: {
        containLabel: true,
        left: 8,
        right: 8,
        top: 32,
        bottom: 20,
      },
      tooltip: {
        trigger: "axis",
        backgroundColor: "#2d2b28",
        borderColor: "#4d4a46",
        borderWidth: 1,
        textStyle: {
          color: "#fff",
          fontSize: 12,
        },
        formatter: (params: echarts.TooltipComponentFormatterCallbackParams) => {
          if (!Array.isArray(params) || params.length === 0) return "";
          const dataIndex = params[0].dataIndex as number;
          const item = data[dataIndex];
          if (!item) return "";

          // Format date nicely (parse string directly to avoid timezone shift)
          const [year, month, day] = item.date.split("-");
          const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const dateStr = `${monthNames[parseInt(month, 10)]} ${parseInt(day, 10)}, ${year}`;

          return `
            <div style="font-weight: 600; margin-bottom: 8px;">${dateStr}</div>
            <div style="color: ${PRIMARY_COLOR};">Total: <strong>${formatRequests(item.total)} requests</strong></div>
            <div style="color: ${AZION_COLOR}; opacity: 0.8;">Azion: ${formatRequests(item.azion)}</div>
            <div style="color: ${CLOUDFLARE_COLOR}; opacity: 0.8;">Cloudflare: ${formatRequests(item.cloudflare)}</div>
          `;
        },
      },
      legend: {
        show: false,
      },
      xAxis: {
        type: "category",
        data: data.map((d) => d.date),
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#9d9a96",
          fontSize: 9,
          interval: 6, // Show roughly weekly labels
          formatter: (value: string) => {
            // Parse date string directly without JS Date to avoid timezone shift
            const [, month, day] = value.split("-");
            const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            return `${monthNames[parseInt(month, 10)]} ${parseInt(day, 10)}`;
          },
        },
      },
      yAxis: {
        type: "value",
        show: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#5d5a56",
          fontSize: 9,
          formatter: (value: number) => formatRequests(value),
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#2d2b28",
            type: "dashed",
          },
        },
      },
      series: [
        {
          name: "Total",
          type: "line",
          data: data.map((d) => d.total),
          smooth: true,
          symbol: "none",
          lineStyle: {
            color: PRIMARY_COLOR,
            width: 3,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: `${PRIMARY_COLOR}40` }, // 25% opacity at top
              { offset: 1, color: `${PRIMARY_COLOR}00` }, // 0% opacity at bottom
            ]),
          },
        },
      ],
    };

    chart.setOption(option);

    // ResizeObserver for responsive behavior (width AND height)
    const resizeObserver = new ResizeObserver(() => {
      chart.resize();
    });
    resizeObserver.observe(containerRef.current);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      chart.dispose();
      chartRef.current = null;
    };
  }, [data]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
}
