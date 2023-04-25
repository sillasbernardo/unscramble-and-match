import { useState, useRef, SyntheticEvent } from "react";
import { useDispatch } from "react-redux/es/exports";

import SearchIconGif from "../../assets/search.gif";
import SearchIconPng from "../../assets/search.png";
import "./Search.scss";
import { searchContentActions } from "../../Store/SearchContent";

const Search = () => {
  const [imageSrc, setImageSrc] = useState(SearchIconPng);

  const inputRef = useRef<HTMLInputElement>(null);

  const reduxDispatch = useDispatch()

  const btnHoverHandler = (action: String) => {
    if (action === "enter"){
      setImageSrc(SearchIconGif)
    } else if (action === "leave"){
      setImageSrc(SearchIconPng)
    }
  }

  const inputChangeHandler = (event: SyntheticEvent) => {
    reduxDispatch(searchContentActions.setValue({
      value: inputRef.current?.value
    }))
  }

  const searchBtnHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    reduxDispatch(searchContentActions.startSearching())
    reduxDispatch(searchContentActions.showResults());
  }

  return (
    <div className="form__container">
      <form className="form__element">
        <input onChange={inputChangeHandler} ref={inputRef} type="text" placeholder="Insert letters here" />
        <button onClick={searchBtnHandler} onMouseEnter={() => btnHoverHandler("enter")} onMouseLeave={() => btnHoverHandler("leave")}>
          <img src={imageSrc} width={30} />
        </button>
      </form>
    </div>
  );
};

export default Search;
