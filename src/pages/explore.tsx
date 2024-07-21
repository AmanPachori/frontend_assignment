import Layout from "@/components/Layout";
import ExplorePage from "@/components/ExplorePage";
import { useEffect, useState } from "react";
import { cryptoInfo } from "@/types/CoinInfo";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import styles from "@/styles/Explore.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Spinner } from "@chakra-ui/react";
import ErrorMessage from "@/components/ErrorMessage";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import { Service } from "@/services/service";
import { setExploreCrypto } from "@/redux/explorePageSlice";
import SwitchTab from "@/components/SwitchTab";
import { onDragEnd } from "@/utils/DragFunction";

export default function Explore() {
  const [loading, setLoading] = useState<boolean>(true);
  const [apiLimitReached, setApiLimitReached] = useState<boolean>(false);
  const dispatch = useDispatch();
  const explore = useSelector(
    (state: RootState) => state.explore.exploreCrypto
  );
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const recent = useSelector((state: RootState) => state.recentlyAdded.items);

  const tabs = ["All Coins", "Recently Viewed"];

  const [activeTab, setActiveTab] = useState("All Coins");
  const handleTabSwitch = (tab: string) => {
    setLoading(true);
    setActiveTab(tab);
  };
  useEffect(() => {
    Service.getTrendingCryptodata("100")
      .then((res) => {
        if (res == null) {
          setApiLimitReached(true);
        } else {
          if (explore.length === 0) dispatch(setExploreCrypto(res));
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, activeTab]);

  const handleDragEnd = (result: DropResult) => {
    onDragEnd(
      result,
      wishlist,
      explore,
      (item: cryptoInfo) => dispatch(addToWishlist(item)),
      (item: cryptoInfo) => dispatch(removeFromWishlist(item)),
      "explore"
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
        ) : explore.length === 0 || apiLimitReached ? (
          <ErrorMessage msg="Sorry, but we've reached our API limit for the day. We appreciate your enthusiasm! Please check back tomorrow to access our services again." />
        ) : (
          <>
            <div className={styles.body}>
              <SwitchTab
                tabs={tabs}
                activeTab={activeTab}
                onSwitch={handleTabSwitch}
              />
              <ExplorePage
                explore={activeTab === "All Coins" ? explore : recent}
                wishlist={wishlist}
              />
            </div>
          </>
        )}
      </Layout>
    </DragDropContext>
  );
}
