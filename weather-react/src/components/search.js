import React, {useState} from "react";

import "../static/css/search.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Search = (props) => {
    const [cityName, setCityName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onChangeCity = (e) => {
        const cityName = e.target.value;
        setCityName(cityName)
        setErrorMessage(() => cityName.match(/\d+/) ? "City is invalid" : '')
    }

    const search = async (e) => {
        e.preventDefault();

        if (errorMessage === '') {
            props.setCity(cityName);
        }
    }

    return (
        <form>
            <input
                type="text"
                className="search-bar"
                placeholder="Enter city..."
                onChange={onChangeCity}
                value={cityName}
            />
            <button type="submit" className="button search-button" onClick={search}>
                Search
            </button>
            {errorMessage &&
            <div className="alert alert-danger" role="alert">
                {errorMessage}
            </div>
            }
        </form>
    );
}

export default Search;