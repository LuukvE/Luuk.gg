import React, { useEffect } from 'react';
import { Box, Stack, Diagram, Heading, Text } from 'grommet';
import moment from 'moment';
import { matches } from '../utils/data';

export default () => {
  useEffect(() => {
    document.title = 'Luuk.GG';    
  }, []);

  
  const tournaments = matches.reduce((tournaments, match) => {
    const {
      id,
      state,
      teams,
      results,
      date_start,
      title: { slug : game },
      tournament: {
        id : tournament,
        full_name : tournament_name,
      },
    } = match;

    tournaments[tournament] = tournaments[tournament] || [];

    tournaments[tournament].push({
      id,
      game,
      state,
      teams: teams.reduce((memo, team) => {
        memo[team.id] = team.name;
        return memo;
      }, {}),
      results,
      tournament,
      tournament_name,
      start: moment(date_start),
    });

    return tournaments;
  }, {});

  const diagrams = Object.keys(tournaments).map((id) => {
    tournaments[id].sort((a, b) => a.start - b.start);
    const { rows } = tournaments[id].reduce((memo, match) => {
      if(match.results.find(result => memo.teams.indexOf(result.team_id) > -1)) {
        memo.rows.push([]);
        memo.teams = [];
      }
      match.results.map(result => {
        memo.teams.push(result.team_id);
      });
      memo.rows[memo.rows.length - 1].push(match);
      return memo;
    }, { teams: [], rows: [[]] });
    
    return <Stack key={id} guidingChild={1}>
      <Diagram
        connections={[
          // {
          //   fromTarget: '1',
          //   toTarget: '2',
          //   thickness: 'xsmall',
          //   color: 'accent-2',
          // },
          // {
          //   fromTarget: '1',
          //   toTarget: '4',
          //   thickness: 'xsmall',
          //   color: 'accent-2',
          //   type: 'rectilinear',
          // },
        ]}
      />
      <Box direction="column-reverse">
        {rows.map((row, index) =>
          <Box
            key={index}
            direction="row"
            margin={{ bottom: 'medium' }}
          >
            {row.map((match) => {
              const { results, id } = match;
              if(results.length == 0) results.push({}, {});
              else if(results.length == 1) results.push({});
              return <Box
                key={id}
                id={id}
                margin="small"
                flex
                justify="center"
                direction="row"
                pad={{ horizontal: 'small', top: 'large', bottom: 'large' }}
                background="rgba(0,0,0,0.3)"
              >
                <Box
                  style={{
                    height: '150px',
                    background: `url("/teams/${results[0].team_id || 'unknown'}.png") center center / contain no-repeat`,
                    width: '50%',
                  }}
                >
                  <Text margin={{ top: '-30px', horizontal: 'auto' }}>{results[0].score}</Text>
                  <Text
                    truncate
                    alignSelf="stretch"
                    textAlign="center"
                    margin={{ top: 'auto', bottom: '-40px' }}
                  >{match.teams[results[0].team_id]}
                  </Text>
                </Box>
                <Box
                  style={{
                    height: '150px',
                    background: `url("/teams/${results[1].team_id || 'unknown'}.png") center center / contain no-repeat`,
                    width: '50%',
                  }}
                >
                  <Text margin={{ top: '-30px', horizontal: 'auto' }}>{results[1].score}</Text>
                  <Text
                    truncate
                    alignSelf="stretch"
                    textAlign="center"
                    margin={{ top: 'auto', bottom: '-40px' }}
                  >{match.teams[results[1].team_id]}
                  </Text>
                </Box>
              </Box>
            })}
          </Box>,
        )}
        <Heading level="2" alignSelf="center">{rows[0][0].tournament_name}</Heading>
      </Box>
    </Stack>;
  });

  return (
    <Box
      flex
      overflow={{ vertical: 'auto' }}
      pad={{ horizontal: 'small' }}
    >
      {diagrams}
    </Box>
  );
};