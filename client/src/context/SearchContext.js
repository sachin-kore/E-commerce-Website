import { useState, useContext, createContext } from "react";


const SearchContext = createContext();
const SearchProvider = ({ children }) => {
    const [keyword, setKeyword] = useState({
        keyword: "",
        result: [],
    });


    return (
        <SearchContext.Provider value={[keyword, setKeyword]}>
            {children}
        </SearchContext.Provider>
    );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
