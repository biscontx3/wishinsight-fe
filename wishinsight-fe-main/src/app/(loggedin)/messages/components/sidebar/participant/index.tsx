import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { useAppContext } from "../../../../../store/AppContext";
import MarkUnreadChatAltOutlinedIcon from "@mui/icons-material/MarkUnreadChatAltOutlined";
interface Participant {
  name: string;
}

const ParticipantRow = ({ name }: Participant) => {
  const { state, dispatch } = useAppContext();
  const handleParticipantClick = (clickedName: string) => {
    dispatch({
      type: "SET_SELECTED_PARTICIPANT",
      payload: clickedName,
    });

    dispatch({
      type: "SET_NOTIFICATION",
      payload: state.notifications.filter((item: string) => item !== name),
    });
  };

  return (
    <div
      className="participant-row flex justify-start items-center"
      onClick={() => handleParticipantClick(name)}
      style={{
        background: state.selectedParticipant === name ? "#00479240" : "",
      }}
    >
      <AccountCircleOutlinedIcon fontSize="large" className="mr-3" /> {name}{" "}
      {state.notifications.includes(name) && (
        <MarkUnreadChatAltOutlinedIcon
          fontSize="small"
          className="ml-3 flex-1"
          style={{ color: "#004792" }}
        />
      )}
    </div>
  );
};

export default ParticipantRow;
