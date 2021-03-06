import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ listField, setSearch,setCurrPage }) => {
    const { list, dic } = listField;
    const [field, setField] = useState('name');
    const [keyword, setKeyword] = useState('');
    const updateField = (event) =>{
        setField(event.target.value);
        setKeyword('');
    };
    const updateKeyword = (event) =>{
        setKeyword(event.target.value);
    };
    const handelClick = (event) => {
        event.preventDefault();
        setSearch({ field, keyword: keyword.toLowerCase() });
        setCurrPage(0);
    }
    return (
        <div className="SearchForm">
            <select id="field" value={field}  onChange={updateField}>
                {list.map((item, index) => (<option key={index} value={dic[index]}>{item}</option>))}
            </select>
            <input id="keyword" type={(field === 'birthday') ? 'date' : 'text' } onChange={updateKeyword} value={keyword} />            
            <button onClick={handelClick}>
                <span className="material-icons icon">
                    search
                </span>
            </button>
        </div>
    )
}

export default SearchForm;