import { useEffect, useState } from "react";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppContext } from "../../../store/AppContext";
import LoadingCircular from "../../Generals/LoadingCircular";
import categories from "../UploadItem/categories.json";
import DeleteModal from "../../DeleteModal";

interface WishProps {
  items: any[];
  loading: boolean;
  setRefetch: (bool: boolean) => void;
}

const WishItems = ({ items, loading, setRefetch }: WishProps) => {
  const { state, dispatch } = useAppContext();
  const [itemToDelete, setItemToDelete] = useState({ id: "", title: "" });
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [open, setOpen] = useState(false);

  const getCategory = (category: string): string => {
    const res = categories.categories.find(
      (item: any) => item.value === category
    )?.text;
    return res ? res : "";
  };

  const deleteItem = async () => {
    setLoadingDelete(true);
    const config = {
      withCredentials: true,
    };

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/user/item/${itemToDelete?.id}`,
        config
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingDelete(false);
      closeModal();
      setRefetch(true);
    }
  };

  const closeModal = async () => {
    setOpen(false);
    setItemToDelete({ id: "", title: "" });
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center flex-col justify-center w-full">
          <LoadingCircular width={100} height={100} />
          <p>Loading items...</p>
        </div>
      ) : (
        <section className="p-10 w-full">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Recurring</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="wish-table">
                {items?.map((row: any) => (
                  <TableRow
                    key={row.title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="capitalize"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className="capitalize"
                    >
                      {row.amount}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className="capitalize"
                    >
                      {row.recurring}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      className="capitalize"
                    >
                      {getCategory(row.category)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      $ {row.price}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <DeleteIcon
                        className="cursor-pointer"
                        onClick={() => {
                          setItemToDelete({ id: row.id, title: row.title });
                          setOpen(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </section>
      )}

      <DeleteModal
        open={open}
        text={`Are you sure you want to delete ${itemToDelete.title} ?`}
        confirm={() => deleteItem()}
        cancel={() => closeModal()}
        loadingDelete={loadingDelete}
      />
    </>
  );
};

export default WishItems;
