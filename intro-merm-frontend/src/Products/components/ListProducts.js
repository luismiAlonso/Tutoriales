import React, {useState} from 'react'
import Loading from './Loading'

const ListProducts = () => {

    const [isLoading, setIsLoading] = useState(true);

    return (
        isLoading
        ? <Loading />
        : 'Mostrar resultado fech'
    )
}

export default ListProducts