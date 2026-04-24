import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    active?: boolean;
    payload?: any[];
    label?: any;
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
    formatter?: any;
    labelFormatter?: any;
    labelClassName?: string;
    color?: string;
  }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart();
    const safePayload = Array.isArray(payload) ? payload : [];

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || safePayload.length === 0) return null;

      const item: any = safePayload[0];
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);

      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, safePayload)}
          </div>
        );
      }

      if (!value) return null;

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [label, labelFormatter, safePayload, hideLabel, labelClassName, config, labelKey]);

    if (!active || safePayload.length === 0) return null;

    const nestLabel = safePayload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-32 gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}

        <div className="grid gap-1.5">
          {safePayload
            .filter((item: any) => item.type !== "none")
            .map((item: any, index: number) => {
              const key = `${nameKey || item.name || item.dataKey || "value"}`;
              const itemConfig = getPayloadConfigFromPayload(config, item, key);
              const indicatorColor = color || item.payload?.fill || item.color;

              return (
                <div key={index} className="flex items-center gap-2">
                  {!hideIndicator && (
                    <div
                      className="h-2.5 w-2.5 rounded"
                      style={{ backgroundColor: indicatorColor }}
                    />
                  )}

                  <span className="text-muted-foreground">
                    {itemConfig?.label || item.name}
                  </span>

                  {item.value !== undefined && (
                    <span className="ml-auto font-mono">
                      {item.value.toLocaleString()}
                    </span>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    payload?: any[];
    verticalAlign?: "top" | "bottom";
    hideIcon?: boolean;
    nameKey?: string;
  }
>(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();

  const safePayload = Array.isArray(payload) ? payload : [];

  if (safePayload.length === 0) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {safePayload
        .filter((item: any) => item.type !== "none")
        .map((item: any, index: number) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div key={index} className="flex items-center gap-1.5">
              {!hideIcon && (
                <div
                  className="h-2 w-2 rounded"
                  style={{ backgroundColor: item.color }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: any,
  key: string
) {
  if (!payload) return undefined;

  const payloadData = payload?.payload;

  let configKey = key;

  if (payload[key]) {
    configKey = payload[key];
  } else if (payloadData?.[key]) {
    configKey = payloadData[key];
  }

  return config[configKey] || config[key];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};