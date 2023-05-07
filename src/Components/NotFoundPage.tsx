import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const NotFoundTitle = styled.h1`
  font-size: 6rem;
  margin-bottom: 0;
  color: #333;
`;

const NotFoundSubtitle = styled.h2`
  font-size: 2.5rem;
  margin-top: 0;
  color: #555;
`;

const NotFoundText = styled.p`
  font-size: 1.5rem;
  text-align: center;
  color: #777;
`;

const NotFoundLink = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  color: #fff;
  background-color: #333;
  padding: 1rem 2rem;
  border-radius: 5px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #555;
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundSubtitle>Page Not Found</NotFoundSubtitle>
      <NotFoundText>The page you are looking for does not exist.</NotFoundText>
      <NotFoundLink to="/">Go back to home page</NotFoundLink>
    </NotFoundContainer>
  );
};

export default NotFound;
