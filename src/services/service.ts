import axios from "axios";
import { CoinInfo, Graph, PriceDataPoint } from "@/types/Coin";
import { cryptoInfo } from "@/types/CoinInfo";
import { aggregateData } from "@/utils/GraphDataMapping";

const BASE_URL = "/api/coins";
const API_KEY = "CG-jFS6vstt1QCgXbeNxQKRWteC";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": API_KEY,
  },
});

type SearchSuggestion = {
  id: string;
  name: string;
};

export class Service {
  public static async getTrendingCryptodata(perPage: string): Promise<any> {
    const response = await axiosInstance.get(`/markets`, {
      params: { vs_currency: "usd", per_page: perPage },
    });
    return response.data;
  }

  public static async getTrendingCryptodatabyId(id: string): Promise<any> {
    const response = await axiosInstance.get(`/markets`, {
      params: { vs_currency: "usd", ids: id },
    });
    return response.data;
  }

  public static async getCryptoDetails(id: string): Promise<CoinInfo | null> {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  }

  public static async getCompanyGraph(
    id: string,
    activeRange: string
  ): Promise<Graph[]> {
    const response = await axiosInstance.get(`/${id}/market_chart`, {
      params: { vs_currency: "usd", days: activeRange },
    });
    const data = response.data;

    if (!Array.isArray(data.prices)) {
      throw new Error("Unexpected data format");
    }

    const priceData: PriceDataPoint[] = data.prices.map(
      ([timestamp, price]: [number, number]) => ({ timestamp, price })
    );

    return aggregateData(priceData, activeRange);
  }

  public static async getSearchSuggestions(
    keyword: string
  ): Promise<SearchSuggestion[]> {
    const response = await axios.get("/api/search", {
      params: { query: keyword },
    });

    const data = response.data;

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
