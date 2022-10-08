import { Link } from "react-router-dom";
import styled from 'styled-components';

export default function Filme({ filme }) {
    return (
        <>
            <Link to={'/sessoes/${filme.id'}>
                <Filme>
                    <img src={filme.cartazUrl} />
                </Filme>
            </Link>
        </>
    );
}

const Filme = styled.div`
    display: flex;
    padding: 8px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    & img{
        width: 129px;
        height: 193px;
        object-fit: cover;
    }
`