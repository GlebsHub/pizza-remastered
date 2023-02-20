import React, { useEffect} from 'react'
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';

import  { sortList } from "../components/Sort";
import { Categories, Sort, Pagination, PizzaBlock, Skeleton} from "../components";

import { useRef } from 'react';

 

import { useAppDispatch } from '../redux/store';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { SearchPizzaParams } from '../redux/pizza/types';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selector';
import { selectPizzaData } from '../redux/pizza/selectors';

 const Home: React.FC = () => { 
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

 import ("../utils/math").then(math => {
  console.log(math.add(16,26));
 })

  const {items, status} = useSelector(selectPizzaData);
  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
  
  
    const onChangeCategory = React.useCallback((idx: number) => {
      dispatch(setCategoryId(idx));
    }, [])

    const onChangePage = (page: number) => {
      dispatch(setCurrentPage(page))
    }

    const getPizzas = async () => {
      const sortBy = sort.sortProperty.replace('-','');
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}`: '';
      const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
          fetchPizzas({
            sortBy,
            order,
            category,
            search,
            currentPage: String(currentPage),
        })
        );
      
      window.scrollTo(0,0);
    }
    
    //Если изменили параметры и был первый рендер
    // useEffect(() => {
    //     if (isMounted.current) {
    //       const params = {
    //         categoryId: categoryId > 0 ? categoryId: null,
    //         sortProperty: sort.sortProperty,
    //         currentPage
    //       };

    //       const queryString = qs.stringify(params, {skipNulls: true});
      
    //       navigate(`/?${queryString}`);
    //     }

    //     if(!window.location.search) {
    //       dispatch(fetchPizzas({} as SearchPizzaParams));
    //     } 
    //   }, [categoryId, sort.sortProperty, currentPage])

    // Если был первый рендер, то проверяем URL-параметры и сохраняем в рекудсе
    
    useEffect(() => {
      if (window.location.search) {
          const params = (qs.parse(window.location.search.substring(1))) as unknown as SearchPizzaParams;
          const sort = sortList.find(obj => obj.sortProperty === params.sortBy);
         
          dispatch(setFilters({
            searchValue: params.search,
            categoryId: Number( params.category),
            currentPage: Number(params.currentPage),
            sort: sort || sortList[0],
            }),
          );
          isMounted.current = true;
      }
    }, []);

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
      window.scrollTo(0, 0);

      if (!isSearch.current) {
        getPizzas();
      }

      isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);  
  

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>);
  const pizzas = items.map((obj: any) =>(
    // может быть ...obj
      <PizzaBlock key={obj.id} {...obj}/>

    ));
  

  return (
    <div className="container">
        <div className="content__top"> 
                <Categories value={categoryId}  
                  onChangeCategory={onChangeCategory}/>
                <Sort value={sort}/>  
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
              status === 'error' ? 
              <div className="content__error-info">
                  <h2>Произошла ошибка <span>😕</span></h2>
                  <p>
                   К сожалению, не удалось получить питски.
                  </p>
              </div>:
                <div className="content__items">
                { 
                status === 'loading' 
                  ? skeletons
                  : pizzas
                }
                </div>
            }
            
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home;