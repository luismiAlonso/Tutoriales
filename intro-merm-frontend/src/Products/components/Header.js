import React from 'react';
import PropTypes from "prop-types"
import {Container, Section} from 'react-bulma-components'

// Definición del componente Header utilizando destructuring para obtener la prop title
const Header = ({title}) =>{
    return (
        <Section>
            <Container>
                <h1 className="title has-text-centered">{title}</h1>
            </Container>
        </Section>
    )

}

// Definición de PropTypes para el componente Header
Header.propTypes ={

    title: PropTypes.string.isRequired
}

export default Header;

