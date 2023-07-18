import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Loading from './Loading'

const baseUrl ='http://localhost:8081/V1';

async function getProducts(){
  try{
    const reponse = await axios({
        url: `${baseUrl}/products`,
        method: 'GET'
    });

    return Response;

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
            console.log(response);
            return response;
        }    
    })

    return (
        isLoading
        ? <Loading />
        : 'Mostrar resultado Listado'
    )
}

export default ListProducts