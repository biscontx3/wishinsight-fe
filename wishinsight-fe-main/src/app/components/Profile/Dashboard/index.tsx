"use client";
import { useAppContext } from "../../../store/AppContext";
import { Grid } from "@mui/material";
import ProfileDashboardComponent from "./ProfileDashboardComponent";
import WishList from "./WishList";
import SellingList from "./SellingList";
const ProfileDashboard = () => {
  const { state, dispatch } = useAppContext();

  return (
    <>
      <Grid container className="flex items-center justify-center mt-10 ">
        {state.activeDashboard === 0 && <ProfileDashboardComponent />}
        {state.activeDashboard === 1 && <WishList />}
        {state.activeDashboard === 2 && <SellingList />}
      </Grid>
    </>
  );
};

export default ProfileDashboard;
