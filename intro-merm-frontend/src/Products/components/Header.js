import React from 'react';
import {Container, Section} from 'react-bulma-components'


const Header = ({title}) =>{
    return (
        <Section>
            <Container>
                <h1 class="title has-text-centered">{title}</h1>
            </Container>
        </Section>
    )
}

export default Header;

