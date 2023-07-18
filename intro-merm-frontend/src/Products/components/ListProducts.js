import React, { useState, useEffect} from 'react'
import { getProducts } from '../services';
import Loading from './Loading'


const ListProducts = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [products,setProducts] = useState([]);

    useEffect(() => {

        async function loadProducts(){
            
            const response= await getProducts();
            //console.log(response);
            if(response !== undefined && response.status === 200 ){
                setProducts(response.data.products);
            }
            
            setIsLoading(false);
        }  
        
        loadProducts();

    },[]);

    if(isLoading){
        return <Loading />
    }

    if(!products.length){

       return <h2 className="title has-text-centered"> No hay productos </h2>
    }

    return (
         <h2 className="title has-text-centered">Mostrar  Listado</h2>
    )
}

export default ListProducts