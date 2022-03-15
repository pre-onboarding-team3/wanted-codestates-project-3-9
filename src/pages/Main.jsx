import React, { useState, useEffect } from 'react';
import Filter from '../components/Filter';
import Header from '../components/Header';
import Tab from '../components/Tab';
import List from '../components/List/List';
import Grid from '../components/Grid';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const MainComponent = styled.main`
  max-width: 500px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 5px 0 20px 3px #f3f3f3, -5px 0 20px 3px #f3f3f3;
`;

const Main = () => {
  const data = useSelector(state => state.interaction.data);
  const [active, setActive] = useState('grid');

  const handleChange = e => {
    if (e.target.matches('.grid')) {
      setActive('grid');
    } else {
      setActive('list');
    }
  };

  useEffect(() => {
    console.log('리랜더링');
  }, [data]);

  return (
    <MainComponent>
      <Header />
      <Tab handleChange={handleChange} active={active} />
      <Filter data={data} />
      {active === 'grid' ? <Grid /> : <List />}
    </MainComponent>
  );
};

export default Main;
