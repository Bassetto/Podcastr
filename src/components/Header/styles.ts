import styled from 'styled-components';

export const HeaderContainer = styled.header`
    background: ${props => props.theme.colors.background};
    height: 6.5rem;

    display: flex;
    align-items: center;

    padding: 2rem 4rem;

    border-bottom: 1px solid ${props => props.theme.colors.graySecondary};
`;

export const Paragraph = styled.p`
    margin-left: 2rem;
    padding: 0.25rem 0 0.25rem 2rem;
    border-left: 1px solid var(--gray-secondary);
`;

export const Div = styled.div`
    margin-left: auto;
`;

export const Span = styled.span`
    margin-left: auto;
    text-transform: capitalize;
`;