import React from 'react';
import { Loader,Section} from 'react-bulma-components';

const Loading = () =>{
    
    return (
        <Section>
            <div class="columns is-centered">
                <Loader style={{
                    width:100,
                    height:100
                }} />
            </div>
        </Section>
    )
}

export default Loading;