import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Loading from './Loading'

const baseUrl ='http://localhost:8081/V1';

async function getProducts(){
  try{
    const response = await axios({
        url: `${baseUrl}/products`,
        method: 'GET'
    });

    return response;

  }catch(e){

    console.log(e);
  }
}

const ListProducts = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [products,setProducts] = useState([]);

    useEffect(() => {

        async function loadProducts(){
            const response= await getProducts();

            if(response.status === 200 ){
                setProducts(response.data.products);
            }
            
            return response;
        }  
        
        loadProducts();
    })

    return (
        isLoading
        ? <Loading />
        : 'Mostrar resultado Listado'
    )
}

export default ListProducts