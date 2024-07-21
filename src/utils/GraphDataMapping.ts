import { Graph, PriceDataPoint } from "@/types/Coin";

export function aggregateData(
  data: PriceDataPoint[],
  timeRange: string
): Graph[] {
  const aggregatedData: { [key: number]: Graph } = {};

  data.forEach(({ timestamp, price }) => {
    const date = new Date(timestamp);
    let key: number;

    switch (timeRange) {
      case "1":
        date.setMinutes(0, 0, 0);
        key = date.getTime();
        break;
      case "30":
        date.setHours(0, 0, 0, 0);
        key = date.getTime();
        break;
      case "60":
        date.setHours(0, 0, 0, 0);
        key = date.getTime() - (date.getTime() % (2 * 24 * 60 * 60 * 1000));
        break;
      default:
        throw new Error("Invalid time range");
    }

    if (!aggregatedData[key]) {
      aggregatedData[key] = {
        date: key,
        open: price,
        high: price,
        low: price,
        close: price,
        volume: price,
      };
    } else {
      const pointData = aggregatedData[key];
      pointData.high = Math.max(pointData.high, price);
      pointData.low = Math.min(pointData.low, price);
      pointData.close = price;
      pointData.volume = price;
    }
  });

  return Object.values(aggregatedData)
    .map(({ date, open, high, low, close, volume }) => ({
      date,
      open,
      high,
      low,
      close,
      volume,
    }))
    .sort((a, b) => a.date - b.date);
}
