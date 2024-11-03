"use client";
import { useAppContext } from "../../../store/AppContext";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingCircular from "../../Generals/LoadingCircular";
import categories from "./categories.json";
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
  TextareaAutosize,
  OutlinedInput,
  InputAdornment,
  Autocomplete,
  TextField,
  createFilterOptions,
} from "@mui/material";
const requestTypes = [
  {
    value: "niche",
    text: "Niche ( If I could find them...)",
  },
  {
    value: "bargain",
    text: "Bargain ( If they were cheaper...)",
  },
];

const recurringTypes = [
  {
    value: "once",
    text: "once",
  },
  {
    value: "day",
    text: "per day",
  },
  {
    value: "week",
    text: "per week",
  },
  {
    value: "month",
    text: "per month",
  },
  {
    value: "year",
    text: "per year",
  },
];

const filter = createFilterOptions();

const UploadItemModal = () => {
  const { state, dispatch } = useAppContext();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState<number>(0);
  const [itemNamesList, setItemNamesList] = useState([]);
  const [amount, setAmount] = useState(1);
  const [itemDescription, setItemDescription] = useState("");
  const [recurring, setRecurring] = useState(recurringTypes[0].value);
  const [category, setCategory] = useState(categories.categories[0].value);
  const [type, setType] = useState(requestTypes[0].value);
  const [loading, setLoading] = useState(false);
  const [loadingNames, setLoadingNames] = useState(false);

  useEffect(() => {
    getItemNames();
  }, []);

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

  const handleClose = () => {
    dispatch({
      type: "OPEN_NEW_REQUEST_MODAL",
      payload: false,
    });

    clearFields();
  };

  const clearFields = () => {
    setItemName("");
    setItemPrice(0);
    setAmount(1);
    setItemDescription("");
    setRecurring(recurringTypes[0].value);
    setType("");
  };

  const handleItemRequest = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const data = {
      title: itemName.toLowerCase(),
      price: itemPrice,
      amount,
      description: itemDescription,
      recurring,
      type,
      category,
    };

    const config = {
      withCredentials: true,
    };

    try {
      await axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/user/add-request`,
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
  const handleTypeChange = (event: any) => {
    setType(event.target.value);
  };

  const handleRecurring = (event: any) => {
    setRecurring(event.target.value as string);
  };

  const handleAmount = (num: number) => {
    setAmount(num);
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
      <Modal open={state.newRequestModal}>
        <>
          <form
            className="request-modal"
            onSubmit={(e) => handleItemRequest(e)}
          >
            <div className=" flex items-center justify-between mb-5">
              <h2>Wish Request</h2>
              <CloseIcon
                fontSize="large"
                className="cursor-pointer"
                onClick={() => handleClose()}
              />
            </div>
            <div className="mb-5">
              <div className="flex flex-col items-start ">
                <FormControl>
                  <FormLabel id="request-label" className="mb-1">
                    Type of request
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="request-label"
                    value={requestTypes[0].value}
                    name="request-group"
                    onChange={handleTypeChange}
                  >
                    {requestTypes.map((item) => {
                      return (
                        <FormControlLabel
                          key={item.value}
                          value={item.value}
                          control={<Radio />}
                          label={item.text}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
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
                htmlFor="name"
                className=" font-medium text-gray-900  flex items-center mb-2"
              >
                Description
              </label>
              <div className="flex items-center ">
                <TextareaAutosize
                  value={itemDescription}
                  onChange={(e) => setItemDescription(e.target.value)}
                  minRows={2}
                  placeholder="Describe the item as accurate as possible"
                  className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="mb-5">
                <InputLabel
                  htmlFor="outlined-adornment-amount"
                  className="text-black"
                >
                  I would pay (per item)
                </InputLabel>
                <OutlinedInput
                  style={{ height: "53px", width: "200px" }}
                  value={itemPrice}
                  required
                  type={"number"}
                  onChange={(e) => setItemPrice(parseInt(e.target.value))}
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment
                      position="start"
                      style={{ marginRight: "10px" }}
                    >
                      $
                    </InputAdornment>
                  }
                  className="bg-white "
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="select-reccuring"
                  className="  font-medium text-gray-900  flex items-center"
                >
                  How often?
                </label>
                <div className="flex items-center ">
                  <Select
                    style={{ height: "53px", width: "200px" }}
                    id="select-reccuring"
                    value={recurring}
                    className="bg-white border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  placeholder:text-gray-400"
                    onChange={handleRecurring}
                  >
                    {recurringTypes.map((item: any) => {
                      return (
                        <MenuItem key={item.value} value={item.value}>
                          {item.text}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <InputLabel
                htmlFor="outlined-adornment-amount"
                className="text-black"
              >
                Quantity
              </InputLabel>
              <OutlinedInput
                style={{ height: "53px", width: "200px" }}
                value={amount}
                required
                type={"number"}
                onChange={(e: any) => handleAmount(Number(e.target.value))}
                id="outlined-adornment-amount"
                className="bg-white "
              />
            </div>

            <div className="flex items-center justify-center mt-5 request-btn-modal">
              <Button type="submit" disabled={false}>
                {loading ? (
                  <LoadingCircular width={25} height={25} />
                ) : (
                  "Add request"
                )}
              </Button>
            </div>
          </form>
        </>
      </Modal>
    </>
  );
};

export default UploadItemModal;
