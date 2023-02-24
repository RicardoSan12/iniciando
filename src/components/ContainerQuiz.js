import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startGetDataAPI, startTryAgain } from '../actions/quiz';
import { ContainerQuestion } from './ContainerQuestion';
import { Error404 } from './Error404';
import { Spinner } from './Spinner';

export const ContainerQuiz = () => {
  const { tryAgain, loading, errorAPI } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  // console.log(import.meta.env.MODE);

  // Sirve para la primera carga de datos provenientes el api
  useEffect(() => {
    dispatch(startGetDataAPI());
  }, [dispatch]);

  // Sirve para proximas solicitudes al API solo cuando tryAgain sea true
  useEffect(() => {
    if (tryAgain) {
      dispatch(startGetDataAPI());
      dispatch(startTryAgain(false));
    }
  }, [tryAgain, dispatch]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : errorAPI ? (
        <Error404 />
      ) : (
        <>
          <ContainerQuestion />
          <Footer>
            Created by <b>OmarUriel8</b> -{' '}
            <a
              href="https://devchallenges.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              devChallenges.io
            </a>
          </Footer>
        </>
      )}
    </>
  );
};

const Footer = styled.footer`
	font-size: 0.9rem;
	color: #f2f2f2;
	text-align: center;
	margin-bottom: 3rem;
	a {
		color: #f2f2f2;
		text-decoration: none;
	}
`;
