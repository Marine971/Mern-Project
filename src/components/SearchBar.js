import {useState} from "react";

function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        onSearch(searchQuery);
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar;
