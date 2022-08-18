import styles from './Search.module.scss';
import { useContext, useRef, useCallback, useState } from 'react';
import {useDispatch } from 'react-redux';
import { SearchContext } from '../../App';
import {setSearchValue} from '../../redux/slices/filterSlice';
import debounce from 'lodash.debounce';

const Search = () => {
const dispatch = useDispatch();
const [value, setValue] = useState(''); //- local state -> controlled component
  const inputRef = useRef(); //вытащить ссылку на Dom-элемент //console.log(inputRef) //{current:undefined}


  //const { searchValue, setSearchValue } = useContext(SearchContext);

  const onClickClear = () => {
    //setSearchValue('');
    dispatch(setSearchValue(''))
    setValue('');
    inputRef.current.focus();
  };

  //* debounce-2 // useCallback сохранает ссылку на отложенную ф-ю при 1-м рендере и больше не пересоздается
  const updateSearchValue = useCallback(
    debounce(str => {
      dispatch(setSearchValue(str))
    }, 250),
    [],
  );

  //* debounce-1 with local controlled component
  const onChangeInput = event => {
    setValue(event.target.value); //если меняеися input вызываем debounce
    updateSearchValue(event.target.value); // вызываем debounce
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>

      <input
        ref={inputRef}
        value={value} //***
        onChange={onChangeInput} //*
        //onChange={event => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />

      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
