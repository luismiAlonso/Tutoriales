import React, { useState, useRef } from 'react'
import { Form as BulmaForm, Button } from 'react-bulma-components'

const {Field,Control,Label,Input} = BulmaForm;

const Form = ({ handleSubmit }) => {
 
    const [formValues, setFormValues] = useState({
        name: '',
        size: '',
        priceUnitary: '',
        description: ''
    });

    const inputFileRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    };

    const _handleSubmit = (e) =>{
        e.preventDefault();
        handleSubmit({...formValues,image: inputFileRef.current.files[0]})
    }

    return (
        <form onSubmit={_handleSubmit}>
            <Field>
                <Label>Name</Label>
                <Control>
                    <Input placeholder="Name..."
                    name="name"
                    value = {formValues.name}
                    onChange={handleChange}
                    />
                </Control>
            </Field>
            <Field>
                <Label>Size</Label>
                <Control>
                    <Input placeholder="Size"
                    name="size"
                    value = {formValues.size}
                    type="number"
                    onChange={handleChange}
                    />
                </Control>
            </Field>
            <Field>
                <Label>Price Unitary</Label>
                <Control>
                    <Input placeholder="priceUnitary"
                    name="priceUnitary"
                    value = {formValues.priceUnitary}
                    type="number"
                    onChange={handleChange}
                    />
                </Control>
            </Field>
            <Field>
                <Label>Description</Label>
                <Control>
                    <Input placeholder="description"
                    name="description"
                    value = {formValues.description}
                    onChange={handleChange}
                    />
                </Control>
            </Field>
            <Field>
                <Label>Image</Label>
                <Control>
                  <input type="file" ref={inputFileRef}></input>
                </Control>
            </Field>
            <Button type="submit" color="primary">Save</Button>
        </form>
    );
}

export default Form;