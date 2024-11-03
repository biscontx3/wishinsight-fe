import { useState, useEffect } from "react";
import { useAppContext } from "../../../store/AppContext";
import { Grid } from "@mui/material";
import WishItems from "../WishItems";
import BargainItems from "../BargainItems";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingCircular from "../../Generals/LoadingCircular";
import categories from "../UploadItem/categories.json";
import DeleteModal from "../../DeleteModal";

const SellingList = () => {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState(0);
  const [sellingItems, setSellingItems] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState({ id: "", title: "" });
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [open, setOpen] = useState(false);

  const getCategory = (category: string): string => {
    const res = categories.categories.find(
      (item: any) => item.value === category
    )?.text;
    return res ? res : "";
  };

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    setLoading(true);
    const config = {
      withCredentials: true,
    };

    try {
      const sellingRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/selling-items`,
        config
      );

      setSellingItems(sellingRes.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = async () => {
    setOpen(false);
    setItemToDelete({ id: "", title: "" });
  };

  const deleteItem = async () => {
    setLoadingDelete(true);
    const config = {
      withCredentials: true,
    };

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/user/itemselling/${itemToDelete?.id}`,
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

  return (
    <>
      {" "}
      {loading ? (
        <div className="flex items-center flex-col justify-center w-full">
          <LoadingCircular width={100} height={100} />
          <p>Loading items...</p>
        </div>
      ) : (
        <section className="p-10 w-full">
          <h3 className="text-center mb-6 text-3xl text-slate-500">
            Your selling items
          </h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>

                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="wish-table">
                {sellingItems?.map((row: any) => (
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
                      {getCategory(row.category)}
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

export default SellingList;
