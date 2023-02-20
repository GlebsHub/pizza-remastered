
import React, { useRef } from 'react';
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'
import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';


export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  

  const onClickClear = (event: React.MouseEvent<SVGSVGElement>) => {
    console.log(event)
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  }
  
  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 1000),
    [],
  )

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  }

  const onClickDiv = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event)
  }

   return (
     <div onClick={onClickDiv} className={styles.root}>
        <svg 
        className={styles.icon}>
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        <input
          ref={inputRef}
          value={value}
          onChange={onChangeInput} 
          className={styles.input} placeholder='Поиск пиццы...'/>
          {value && (
            <svg 
            onClick={onClickClear}
            className={styles.clear}>
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
          </svg>
          )}
    </div>
   )
 }
 
  