import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import CoinInfoPage from "@/components/CoinInfoPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Service } from "@/services/service";
import { setCryptoData, setGraphData } from "@/redux/cryptoPageSlice";
import styles from "@/styles/Explore.module.css";

import { useRouter } from "next/router";
import { Spinner } from "@chakra-ui/react";
import ErrorMessage from "@/components/ErrorMessage";
import { addTorecentlyAdded } from "@/redux/recentlyAddedSlice";
import { cryptoInfo } from "@/types/CoinInfo";
import { CoinInfo } from "@/types/Coin";
const Coins = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [apiLimitReached, setApiLimitReached] = useState<boolean>(false);
  const [activeRange, setActiveRange] = useState<string>("1");
  const handleRangeChange = (val: string) => {
    setActiveRange(val);
  };

  const [cryptoData1, setCryptoData1] = useState<CoinInfo>();
  const [graphData1, setGraphData1] = useState<any>();

  const cryptoData = useSelector((state: RootState) => state.crypto.CryptoData);
  const graphData = useSelector((state: RootState) => state.crypto.GraphData);
  const dispatch = useDispatch();

  const AddToRecentlyViwedCoin = (id: string) => {
    Service.getTrendingCryptodatabyId(id)
      .then((res) => {
        dispatch(addTorecentlyAdded(res[0]));
      })
      .catch((err) => {
        setApiLimitReached(true);
      });
  };

  useEffect(() => {
    if (router.query.slug) {
      Service.getCryptoDetails(router.query.slug as string).then((res) => {
        if (res === null) {
          setApiLimitReached(true);
        } else {
          dispatch(setCryptoData(res));
          setCryptoData1(res);
          AddToRecentlyViwedCoin(router.query.slug as string);
        }
      });
    }
  }, [router.query.slug, dispatch]);

  useEffect(() => {
    const fetchGraphData = async () => {
      setLoading(true);
      if (router.query.slug) {
        try {
          const res = await Service.getCompanyGraph(
            router.query.slug as string,
            activeRange
          );
          if (res === null) {
            setApiLimitReached(true);
          } else {
            dispatch(setGraphData(res));
            setGraphData1(res);
          }
        } catch (err) {
          console.error(err);
          setApiLimitReached(true);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchGraphData();
  }, [router.query.slug, activeRange, dispatch]);

  return (
    <Layout>
      {loading ||
      !cryptoData1 ||
      !Object.keys(cryptoData1).length ||
      !Object.keys(graphData1).length ? (
        <div className={styles.conatiner}>
          <Spinner
            className={styles.spinner}
            alignSelf={"center"}
            alignItems={"center"}
            width={140}
            height={140}
            color="#12D18E"
          />
        </div>
      ) : apiLimitReached ? (
        <ErrorMessage msg=" Sorry, but we've reached our API limit . Please check back after 5 min to acess our  services again." />
      ) : (
        <>
          <div>
            <CoinInfoPage
              cryptoInfo={cryptoData1}
              graphData={graphData1}
              activeRange={activeRange}
              changeActiveRange={handleRangeChange}
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Coins;
