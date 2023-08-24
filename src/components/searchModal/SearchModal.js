import React, { useContext, useState } from "react";
import Button from "../common/Button/Button";
import Input from "../common/Input/Input";
import Modal from "../common/Modal/Modal";
import styles from "./styles/SearchModal.module.scss";
import Icons from "../common/Icons/Icons";
import Typography from "../common/Typography/Typography";
import { Link } from "react-router-dom";
import { Context } from "../../store/Context";
import { setShowSearchModal } from "../../store/Action";
import { useHttpHook } from "../../hooks/useHttpHook";
import CircularProgress from "@mui/material/CircularProgress";

const SearchModal = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const { state, dispatch } = useContext(Context);
  const { darkMood } = state;

  const getSearchResult = (data) => {
    console.log(data);
    setSearchResult(data);
  };
  const { loading, sendRequest, hasError } = useHttpHook();
  // console.log(searchResult, "RESULT")
  const searchHandler = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      sendRequest({ url: `search/${e.target.value}` }, getSearchResult);
    }
  };
  return (
    <Modal onClose={() => dispatch(setShowSearchModal(false))}>
      <div
        className={
          darkMood
            ? `${styles.search_popup_wrapper} ${"dark_mood_popup"}`
            : `${styles.search_popup_wrapper} ${"light_mood_secondary"}`
        }
      >
        <div className={styles.search_input}>
          <Input
            full={true}
            required={false}
            label={"Search..."}
            size={"small"}
            autoComplete="off"
            onChange={searchHandler}
            value={searchValue}
          />
          <Icons name={"search"} color={darkMood ? "#3f7fb8" : "#9fa7b6"} />
        </div>
        <div className={styles.search_result_wrapper}>
          {searchResult && searchResult.length
            ? searchResult.map((result) => (
                <Link
                  to={`/product/single/${result?._id}`}
                  key={result?._id}
                  onClick={() => dispatch(setShowSearchModal(false))}
                >
                  <div
                    className={
                      darkMood
                        ? `${styles.search_result_row} ${"dark_mood_popup"}`
                        : `${styles.search_result_row} ${"light_mood_main"}`
                    }
                  >
                    <img src={result?.image} alt="result.png" />
                    <Typography variant={"body"}>{result?.title}</Typography>
                    <Typography variant={"body"}>
                      Rs. {result?.price}.00
                    </Typography>
                  </div>
                </Link>
              ))
            : null}
          {loading && (
            <div className={styles.loader_wrapper}>
              <CircularProgress />
            </div>
          )}
          {hasError && (
            <div className={styles.error_message}>
              <Typography variant={"body"} color={"red"}>
                Something went wrong!
              </Typography>
            </div>
          )}
        </div>
        <div className={styles.close_btn}>
          <Button
            variant={"red-border"}
            onClick={() => dispatch(setShowSearchModal(false))}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;
