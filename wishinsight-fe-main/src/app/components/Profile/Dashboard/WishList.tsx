import { useState, useEffect } from "react";
import { useAppContext } from "../../../store/AppContext";
import { Grid } from "@mui/material";
import WishItems from "../WishItems";
import BargainItems from "../BargainItems";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import axios from "axios";

const WishList = () => {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState(0);
  const [nicheItems, setNichItems] = useState([]);
  const [bargainItems, setBargainItems] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state.newRequestModal || refetch) {
      getItems();
    }
  }, [refetch, state.newRequestModal]);

  const handleTabs = (event: React.SyntheticEvent, nr: number) => {
    setActiveTab(nr);
  };

  const getItems = async () => {
    setLoading(true);
    const config = {
      withCredentials: true,
    };

    try {
      const [nicheResponse, bargainResponse] = await Promise.all([
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/niche-items`,
          config
        ),
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/bargain-items`,
          config
        ),
      ]);

      setNichItems(nicheResponse.data.items);
      setBargainItems(bargainResponse.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Grid container className="mt-10 flex-col px-10">
      <h3 className="text-center mb-6 text-3xl text-slate-500">
        Your Wish requests
      </h3>
      <Tabs
        value={activeTab}
        onChange={handleTabs}
        className="flex w-full justify-center mx-auto"
      >
        <Tab
          iconPosition="start"
          label={`Niche items ${
            nicheItems.length ? "(" + nicheItems.length + ")" : ""
          }`}
          className="custom-tab"
        />
        <Tab
          iconPosition="start"
          label={`Bargain items ${
            bargainItems.length ? "(" + bargainItems.length + ")" : ""
          }`}
          className="custom-tab"
        />
      </Tabs>
      {activeTab === 0 && (
        <WishItems
          items={nicheItems}
          loading={loading}
          setRefetch={setRefetch}
        />
      )}
      {activeTab === 1 && (
        <BargainItems
          items={bargainItems}
          loading={loading}
          setRefetch={setRefetch}
        />
      )}
    </Grid>
  );
};

export default WishList;
