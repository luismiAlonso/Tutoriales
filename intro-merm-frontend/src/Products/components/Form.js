import React, { useState, useRef } from 'react'
import { Form as BulmaForm} from 'react-bulma-components'

const {Field,Control,Label,Input,Button} = BulmaForm;

const Form = () => {
 
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

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(formValues);
        console.log(inputFileRef.current.files);
    }

    return (
        <form onSubmit={handleSubmit}>
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
            <Button type="submit" color="primary">
                Save
            </Button>
        </form>
    );
}

export default Form;