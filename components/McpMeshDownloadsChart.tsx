import { useRef, useEffect } from "preact/hooks";
import * as echarts from "echarts";

// Use the same primary color as other charts
const PRIMARY_COLOR = "#d0ec1a";

interface DownloadsDataPoint {
  date: string; // "2025-12-20"
  downloads: number;
}

interface McpMeshDownloadsChartProps {
  data: DownloadsDataPoint[];
  height?: number | string; // Default "100%" for flex containers
}

// Format numbers with commas
function formatNumber(value: number): string {
  return value.toLocaleString();
}

export default function McpMeshDownloadsChart({
  data,
  height = "100%",
}: McpMeshDownloadsChartProps) {
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
            <div style="color: ${PRIMARY_COLOR};">Downloads: <strong>${formatNumber(item.downloads)}</strong></div>
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
          formatter: (value: number) => formatNumber(value),
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
          name: "Downloads",
          type: "line",
          data: data.map((d) => d.downloads),
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
