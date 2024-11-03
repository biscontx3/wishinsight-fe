import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import LoadingCircular from "../Generals/LoadingCircular";
const DeleteModal = ({ text, confirm, cancel, loadingDelete, open }: any) => {
  if (!text || !confirm || !cancel) return <></>;

  const handleDelete = async () => {
    await confirm();
  };

  return (
    <>
      <Modal open={open}>
        <div className="delete-modal">
          <h2>Delete item</h2>
          <p>{text}</p>

          {loadingDelete && (
            <div className="flex w-full justify-center  mt-5">
              <LoadingCircular width={30} height={30} />
            </div>
          )}
          {!loadingDelete && (
            <div className="delete-actions-btn">
              <Button onClick={() => cancel()}>Cancel</Button>
              <Button
                className="bg-red-400 text-white"
                onClick={() => handleDelete()}
                disabled={loadingDelete}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
