import React, { useEffect } from 'react';
import { Box, Stack, Diagram, Meter } from 'grommet';
// import { tokens, authenticate, get } from '../utils/requests';
// import { teams } from '../utils/data';

export default () => {
  useEffect(() => {
    document.title = 'Luuk.GG';

    // authenticate('', '', (response) => {
    //   console.log(JSON.stringify(response, null, 2));
    // });

    // get('title', response => {
    //   console.log(JSON.stringify(response, null, 2));
    // });

    // const teams = matches.reduce((memo, match, index) => {
    //   console.log(index);
    //   match.teams.map(team => {
    //     memo[team.id] = team;
    //   });
    //   return memo;
    // }, {});

    // console.log(JSON.stringify(Object.keys(teams).map(key => teams[key])));

    // teams.map((team) => {
    //   getImage(team.id, team.logo_icon);
    // });

    // async function getImage(id, url) {
    //   const response = await fetch(url, { method: 'GET', headers: { Authorization: `Bearer ${tokens.access_token}` } });
    
    //   const blob = await response.blob();
    
    //   const reader = new FileReader();

    //   reader.onloadend = () => {       
    //       console.log(id, reader.result.length);  
    //       window.logos = window.logos || {};
    //       window.logos[id] = reader.result;
    //   };

    //   reader.readAsDataURL(blob); 
    // }
    
  }, []);

  return (
    <Box
      flex
      background="#f2f5f8"
      overflow={{ vertical: 'hidden' }}
      pad={{ top: 'large', horizontal: 'large' }}
      border={{ side: 'top', size: 'small', color: 'light-1' }}
    >
      <Stack guidingChild={1}>
        <Diagram
          connections={[
            {
              fromTarget: '1',
              toTarget: '2',
              thickness: 'xsmall',
              color: 'accent-2',
            },
            {
              fromTarget: '1',
              toTarget: '4',
              thickness: 'xsmall',
              color: 'accent-2',
              type: 'rectilinear',
            },
          ]}
        />
        <Box>
          <Box direction="row">
            <Box id="1" margin="small" pad="medium" background="light-4"></Box>
            <Box id="2" margin="small" pad="medium" background="light-4" />
          </Box>
          <Box direction="row">
            <Box id="3" margin="small" pad="medium" background="light-4" />
            <Box id="4" margin="small" pad="medium" background="light-4" />
          </Box>
        </Box>
      </Stack>

      <Meter
        type="circle"
        values={[{
          value: 60,
          label: 'sixty',
          onClick: () => {}
        }]}
        aria-label="meter"
      />
    </Box>
  );
};