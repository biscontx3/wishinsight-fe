"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { useAppContext } from "../store/AppContext";
import UsersItemsModal from "../components/UsersItemsModal";
export default function StartItems() {
  const { state, dispatch } = useAppContext();
  const [items, setItems] = useState([]);
  const [countList, setCountList] = useState([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [yearlyEarnings, setYearlyEarnings] = useState([]);

  useEffect(() => {
    getAllItems();
  }, []);

  const getAllItems = async () => {
    try {
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/all-items`)
        .then((res) => {
          setItems(res.data.list);
          setCountList(res.data.itemCounts);
          setMonthlyEarnings(res.data.pays.monthlyEarningsByTitle);
          setYearlyEarnings(res.data.pays.yearlyEarningsByTitle);
        });
    } catch (error) {}
  };

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ background: "#1E1E1E" }}>
            <TableRow>
              <TableCell className="text-white">Item in demand</TableCell>
              <TableCell className="text-white">Total users</TableCell>
              <TableCell className="text-white">
                Monthly earning potential
              </TableCell>
              {/* <TableCell className="text-white">Average price</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody className="bargain-table">
            {Object.keys(monthlyEarnings).length > 0 &&
              Object.keys(monthlyEarnings)
                ?.sort((a: any, b: any) => {
                  return monthlyEarnings[b] - monthlyEarnings[a];
                })
                .map((row: any) => (
                  <TableRow
                    className="cursor-pointer"
                    key={row}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    onClick={() => {
                      dispatch({
                        type: "OPEN_USERS_ITEMS_MODAL",
                        payload: true,
                      });
                      dispatch({
                        type: "ITEM_TO_FETCH_USERS",
                        payload: row,
                      });
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="capitalize"
                    >
                      {row}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {countList[row]}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      <>
                        <HtmlTooltip
                          title={
                            <div className="p-1 ">
                              <p color="inherit">Yearly earning potential</p>
                              <b className="text-green-700">$</b>{" "}
                              {Math.floor(yearlyEarnings[row])}
                            </div>
                          }
                        >
                          <span className="cursor">
                            <b className="text-green-700">$ </b>
                            {Math.floor(monthlyEarnings[row])}
                          </span>
                        </HtmlTooltip>
                      </>
                    </TableCell>
                    {/* <TableCell component="th" scope="row">
                      <b className="text-green-700">$ </b>
                      {parseInt(items[row])}
                    </TableCell> */}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UsersItemsModal />
    </>
  );
}
