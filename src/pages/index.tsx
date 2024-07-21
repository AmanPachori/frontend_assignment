import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import HomePage from "@/components/HomePage";
import { RootState } from "@/redux/store";
import styles from "@/styles/Explore.module.css";
import { setTrendigCrypto } from "@/redux/homePageSlice";
import { useDispatch } from "react-redux";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Spinner } from "@chakra-ui/react";
import { cryptoInfo } from "@/types/CoinInfo";
import { useSelector } from "react-redux";
import { Service } from "@/services/service";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import ErrorMessage from "@/components/ErrorMessage";
import { Graph } from "@/types/Coin";
import { onDragEnd } from "@/utils/DragFunction";

export default function Home() {
  const [graph, setgraph] = useState<Graph[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [apiLimitReached, setApiLimitReached] = useState<boolean>(false);
  const dispatch = useDispatch();
  const trending = useSelector((state: RootState) => state.home.trendingCrypto);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Service.getTrendingCryptodata("5");
        if (res == null) {
          setApiLimitReached(true);
        } else {
          dispatch(setTrendigCrypto(res));
          const resGraph = await Service.getCompanyGraph("bitcoin", "1");
          setgraph(resGraph);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (graph.length != 0) {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [dispatch, graph]);

  const handleDragEnd = (result: DropResult) => {
    onDragEnd(
      result,
      wishlist,
      trending,
      (item: cryptoInfo) => dispatch(addToWishlist(item)),
      (item: cryptoInfo) => dispatch(removeFromWishlist(item)),
      "trending"
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Layout>
        {loading ? (
          <div>
            <Spinner
              className={styles.spinner}
              alignSelf={"center"}
              alignItems={"center"}
              width={140}
              height={140}
              color="#12D18E"
            />
          </div>
        ) : trending.length === 0 || apiLimitReached ? (
          <ErrorMessage msg="Sorry, but we've reached our API limit for the day. We appreciate your enthusiasm! Please check back tomorrow to access our services again." />
        ) : (
          <>
            <div>
              <HomePage trending={trending} wishlist={wishlist} graph={graph} />
            </div>
          </>
        )}
      </Layout>
    </DragDropContext>
  );
}
