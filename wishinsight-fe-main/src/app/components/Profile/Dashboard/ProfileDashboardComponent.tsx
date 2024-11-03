import { useAppContext } from "../../../store/AppContext";
import { Grid } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import UploadItemModal from "../UploadItem/UploadItem";
import NewSellingItemModal from "../NewSellingItem";
const ProfileDashboardComponent = () => {
  const { state, dispatch } = useAppContext();

  const openNewRequestModal = () => {
    dispatch({
      type: "OPEN_NEW_REQUEST_MODAL",
      payload: true,
    });
  };

  const openNewItemToSellModal = () => {
    dispatch({
      type: "OPEN_NEW_ITEM_TO_SELL_MODAL",
      payload: true,
    });
  };

  return (
    <>
      <Grid
        item
        md={2}
        sm={6}
        xs={6}
        className="profile-card flex flex-col items-center justify-center box-shadow-card mb-3"
        onClick={() => openNewRequestModal()}
      >
        <LibraryAddOutlinedIcon fontSize="large" />
        <p>Add wish request</p>
      </Grid>

      <Grid
        item
        md={2}
        sm={6}
        xs={6}
        className="profile-card flex flex-col items-center justify-center box-shadow-card mb-3"
        onClick={() => openNewItemToSellModal()}
      >
        <AddCircleOutlineIcon fontSize="large" />
        <p>Add item to sell </p>
      </Grid>

      <Grid className="w-full p-10 text-center">
        <h2>Stay tuned for more cool features</h2>
      </Grid>

      <UploadItemModal />
      <NewSellingItemModal />
    </>
  );
};

export default ProfileDashboardComponent;
