"use client";
import { useAppContext } from "../../../store/AppContext";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import axios from "axios";
import LoadingCircular from "../../Generals/LoadingCircular";
import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Autocomplete,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { toast } from "react-toastify";
import categories from "../UploadItem/categories.json";
const filter = createFilterOptions();

const NewSellingItemModal = () => {
  const { state, dispatch } = useAppContext();
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState(categories.categories[0].value);
  const [loading, setLoading] = useState(false);
  const [loadingNames, setLoadingNames] = useState(false);
  const [itemNamesList, setItemNamesList] = useState([]);

  useEffect(() => {
    getItemNames();
  }, []);

  const handleClose = () => {
    dispatch({
      type: "OPEN_NEW_ITEM_TO_SELL_MODAL",
      payload: false,
    });
  };

  const getItemNames = async () => {
    setLoadingNames(true);
    const config = {
      withCredentials: true,
    };

    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/user/item-names`, config)
        .then((res) => {
          setItemNamesList(res.data.items);
        });
    } catch (error) {
      console.log(error);
      notify("Error getting item names", "error");
    } finally {
      setLoadingNames(false);
    }
  };

  const handleItemRequest = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const data = {
      title: itemName.toLowerCase(),
      category,
    };

    const config = {
      withCredentials: true,
    };

    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/add-selling-item`,
          data,
          config
        )
        .then((res) => {
          if (res.status) {
            notify("Item uploaded", "success");
            handleClose();
          }
        });
    } catch (error) {
      console.log(error);
      notify("Error uploading item", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCategory = (event: any) => {
    setCategory(event.target.value as string);
  };

  const notify = (msg: string, type: "success" | "error") =>
    toast(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      type: type,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: "dark",
    });
  return (
    <>
      <Modal open={state.newItemToSellModal} onClose={handleClose}>
        <>
          <form
            className="request-modal"
            onSubmit={(e) => handleItemRequest(e)}
          >
            <h2 className="mb-2">Sell item Request</h2>

            <div className="mb-5">
              <div className="flex items-center ">
                <Autocomplete
                  value={itemName}
                  disablePortal
                  style={{ height: "53px" }}
                  freeSolo
                  id="name"
                  loading={loadingNames}
                  options={itemNamesList}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      const updatedOption = option.replace("Add ", "");
                      return updatedOption;
                    }
                    //@ts-ignore
                    if (option?.inputValue) {
                      //@ts-ignore
                      return option?.inputValue;
                    }
                    // Regular option
                    //@ts-ignore
                    return option?.toString();
                  }}
                  renderOption={(props, option) => <li {...props}>{option}</li>}
                  className="bg-whitetext-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full placeholder:text-gray-400"
                  sx={{ width: 300 }}
                  //@ts-ignore
                  filterOptions={(options, params) => {
                    //@ts-ignore
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some(
                      (option) => inputValue === option
                    );
                    if (inputValue !== "" && !isExisting) {
                      filtered.push(`Add ${inputValue}`);
                    }

                    return filtered;
                  }}
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      const updatedValue = newValue.replace("Add ", "");
                      setItemName(updatedValue.trim());
                      //@ts-ignore
                    } else if (newValue && newValue?.inputValue) {
                      //@ts-ignore
                      setItemName(newValue?.inputValue);
                    } else {
                      //@ts-ignore
                      setItemName(newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Name of the item"
                      label="Item"
                    />
                  )}
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="select-reccuring"
                className="  font-medium text-gray-900  flex items-center"
              >
                Category
              </label>
              <div className="flex items-center ">
                <Select
                  style={{ height: "53px", width: "300px" }}
                  id="select-reccuring"
                  value={category}
                  className="bg-white border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  placeholder:text-gray-400"
                  onChange={handleCategory}
                >
                  {categories.categories.map((item: any) => {
                    return (
                      <MenuItem key={item.value} value={item.value}>
                        {item.text}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-center mt-5 request-btn-modal">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <LoadingCircular width={25} height={25} />
                ) : (
                  "Add item"
                )}
              </Button>
            </div>
          </form>
        </>
      </Modal>
    </>
  );
};

export default NewSellingItemModal;
