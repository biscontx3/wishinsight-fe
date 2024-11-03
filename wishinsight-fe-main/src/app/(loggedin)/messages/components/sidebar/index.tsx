import ParticipantRow from "./participant";
import LoadingCircular from "../../../../components/Generals/LoadingCircular";
interface SidebarProps {
  participants: string[];
  loading: boolean;
}

const SideBar = ({ participants, loading }: SidebarProps) => {
  return (
    <div className="sidebar-chat flex min-h-screen  flex-col pt-20 bg-white">
      <h2 className="text-center">Chat</h2>
      {loading && (
        <div className="flex items-center justify-center">
          {" "}
          <LoadingCircular height={50} width={50} />
        </div>
      )}
      {!loading &&
        participants.map((participant: string) => {
          return <ParticipantRow key={participant} name={participant} />;
        })}
    </div>
  );
};

export default SideBar;
