import { useRef, useEffect } from "preact/hooks";
import * as echarts from "echarts";

const PLATFORM_COLOR = "#d0ec1a";
const SERVICES_COLOR = "#a78bfa";

interface RevenueDataPoint {
  month: string;
  platform: number;
  services: number;
  grossMargin: number;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];
  height?: number | string; // Can be number (px) or "100%" for flex containers
  variant?: "collapsed" | "expanded"; // Controls sizing of legend, labels, bars
}

export default function RevenueChart({
  data,
  height = "100%", // Default to 100% to fill flex container
  variant = "collapsed",
}: RevenueChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);
  
  const isExpanded = variant === "expanded";

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize chart
    const chart = echarts.init(containerRef.current);
    chartRef.current = chart;

    // Build options - both variants show legend, y-axis, and grid lines
    const option: echarts.EChartsOption = {
      animation: false, // Disable animation to prevent slide-mount/resize jank
      backgroundColor: "transparent",
      grid: {
        containLabel: true, // Prevents axis/label clipping
        left: 8,
        right: 8,
        top: isExpanded ? 40 : 32, // Space for legend
        bottom: 18,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
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
          
          const total = item.platform + item.services;
          return `
            <div style="font-weight: 600; margin-bottom: 8px;">${item.month}</div>
            <div style="color: ${PLATFORM_COLOR};">Platform: <strong>R$${item.platform}K</strong></div>
            <div style="color: ${SERVICES_COLOR};">Services: <strong>R$${item.services}K</strong></div>
            <div style="border-top: 1px solid #4d4a46; margin-top: 6px; padding-top: 6px;">Total: <strong>R$${total}K</strong></div>
          `;
        },
      },
      // Always show legend - smaller in collapsed, larger in expanded
      legend: {
        show: true,
        top: 6,
        right: 8,
        textStyle: {
          color: "#9d9a96",
          fontSize: isExpanded ? 14 : 10,
        },
        itemWidth: isExpanded ? 18 : 12,
        itemHeight: isExpanded ? 18 : 12,
        itemGap: isExpanded ? 20 : 12,
        data: [
          { name: "Services R$K", icon: "roundRect" },
          { name: "Platform R$K", icon: "roundRect" },
        ],
      },
      xAxis: {
        type: "category",
        data: data.map((d) => d.month),
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#9d9a96",
          fontSize: isExpanded ? 10 : 9,
          interval: 0,
          margin: 6,
        },
      },
      // Always show y-axis with grid lines
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
          color: "#5d5a56", // Muted for dark theme
          fontSize: isExpanded ? 10 : 9,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#2d2b28", // Subtle grid lines
            type: "dashed",
          },
        },
      },
      series: [
        {
          name: "Platform R$K",
          type: "bar",
          stack: "total",
          data: data.map((d) => d.platform),
          itemStyle: {
            color: PLATFORM_COLOR,
            borderRadius: [0, 0, 4, 4],
          },
          barMaxWidth: isExpanded ? 80 : 78, // Wider for collapsed
          barCategoryGap: isExpanded ? "20%" : "5%", // Much tighter for collapsed
          label: {
            show: true,
            position: "inside",
            color: "#1a1918",
            fontSize: isExpanded ? 14 : 12,
            fontWeight: 700,
            formatter: (params) => {
              const value = params.value as number;
              return value > 100 ? value.toString() : "";
            },
          },
        },
        {
          name: "Services R$K",
          type: "bar",
          stack: "total",
          data: data.map((d) => d.services),
          itemStyle: {
            color: SERVICES_COLOR,
            borderRadius: [4, 4, 0, 0],
          },
          barMaxWidth: isExpanded ? 80 : 72, // Wider for collapsed
          barCategoryGap: isExpanded ? "15%" : "6%", // Much tighter for collapsed
          label: {
            show: true,
            position: "inside",
            color: "#ffffff",
            fontSize: isExpanded ? 13 : 11,
            fontWeight: 700,
            formatter: (params) => {
              const value = params.value as number;
              return value > 60 ? value.toString() : "";
            },
          },
        },
      ],
    };

    chart.setOption(option);

    // ResizeObserver for responsive behavior
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
  }, [data, variant]);

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
