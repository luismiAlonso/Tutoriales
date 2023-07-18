import React, { useState } from 'react';
import { Modal }  from 'react-bulma-components'
import Header from './Header'
import AddButton from './AddButton';
import ListProducts from './ListProducts';
import Form from './Form'
import { saveProducts } from '../services';

//https://couds.github.io/react-bulma-components/?path=/story/welcome--page

const ProductLayoaut = () =>{
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (data) =>{
        saveProducts(data);
    }

    return (
        <>
            <Header title ="Products app" />
            <AddButton  onClick={() => setIsModalOpen(true)}/>
            <ListProducts />
            <Modal show={ isModalOpen } onClose={() => setIsModalOpen(false)}>
                <Modal.Card>
                    <Modal.Card.Header showClose={false}>
                        <Modal.Card.Title>
                            Add Product
                        </Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        <Form handleSubmit={handleSubmit} />
                    </Modal.Card.Body>
                </Modal.Card>
            </Modal>
        </>
    )

}

export default ProductLayoaut;
