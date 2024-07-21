import { CoinInfo, Graph, PriceDataPoint } from "@/types/Coin";
import { cryptoInfo } from "@/types/CoinInfo";
import { aggregateData } from "@/utils/GraphDataMapping";

const BASE_URL = "https://api.coingecko.com/api/v3/coins";
const API_KEY = "CG-jFS6vstt1QCgXbeNxQKRWteC";
const options = {
  method: "GET",
  headers: { accept: "application/json", "x-cg-demo-api-key": API_KEY },
};

type SearchSuggestion = {
  id: string;
  name: string;
};

export class Service {
  public static async getTrendingCryptodata(perPage: string): Promise<any> {
    const response = await fetch(
      `${BASE_URL}/markets?vs_currency=usd&per_page=${perPage} `,
      options
    );
    const Data = await response.json();
    return Data;
  }
  public static async getTrendingCryptodatabyId(id: string): Promise<any> {
    const response = await fetch(
      `${BASE_URL}/markets?vs_currency=usd&ids=${id} `,
      options
    );
    const Data = await response.json();
    return Data;
  }
  public static async getCryptoDetails(id: string): Promise<CoinInfo | null> {
    const response = await fetch(`${BASE_URL}/${id}`, options);
    const Data = await response.json();
    return Data;
  }
  public static async getCompanyGraph(
    id: string,
    activeRange: string
  ): Promise<Graph[]> {
    const response = await fetch(
      `${BASE_URL}/${id}/market_chart?vs_currency=usd&days=${activeRange} `,
      options
    );
    const data = await response.json();
    if (!Array.isArray(data.prices)) {
      throw new Error("Unexpected data format");
    }

    const priceData: PriceDataPoint[] = data.prices.map(
      ([timestamp, price]: [number, number]) => ({ timestamp, price })
    );

    console.log();

    return aggregateData(priceData, activeRange);
  }

  public static async getSearchSuggestions(
    keyword: string
  ): Promise<SearchSuggestion[]> {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(
        keyword
      )}`
    );

    const data = await response.json();

    if (!data.coins || !Array.isArray(data.coins)) {
      return [];
    }

    return data.coins.map((coin: any) => {
      return {
        id: coin.id,
        name: coin.name,
      } as SearchSuggestion;
    });
  }
}
