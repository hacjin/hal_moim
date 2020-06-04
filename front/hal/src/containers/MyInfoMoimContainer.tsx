import React from 'react';
import GoogleFont from 'react-google-font-loader';
import NoSsr from '@material-ui/core/NoSsr';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MyInfoMoim from '../components/MyInfoMoim'

const MyInfoMoimContainer = () => {
  return (
    <div>
      <div>
        내가 개설한 모임
        <Box p={1}  overflow={'hidden'}>
          <Grid container spacing={1} wrap={'nowrap'} style={{overflowX:'scroll'}} >
            <Grid item>
              <MyInfoMoim
                color={'#203f52'}
                title={'Dota 2 test test test test test test test test test test test test test test'}
                image={
                  'https://steamcdn-a.akamaihd.net/apps/dota2/images/blog/play/dota_heroes.png'
                }
              />
            </Grid>
            <Grid item>
              <MyInfoMoim
                color={'#4d137f'}
                title={'Fortnite'}
                image={
                  'https://allyourgames.com/wp-content/uploads/2019/09/10.40.png'
                }
              />
            </Grid>
            <Grid item>
              <MyInfoMoim
                color={'#ff9900'}
                title={'Overwatchfjoidjsfddddddddddddddddddddddddddddddddddddddddddddddddddddddd'}
                image={
                  'https://images5.alphacoders.com/690/thumb-1920-690653.png'
                }
              />
            </Grid>
            <Grid item>
              <MyInfoMoim
                color={'#ff9900'}
                title={'Overwatch'}
                image={
                  'https://images5.alphacoders.com/690/thumb-1920-690653.png'
                }
              />
            </Grid>
          </Grid>
        </Box>    
      </div>
      <div>
        내가 참여한 모임
        <Box p={1}  overflow={'hidden'}>
          <Grid container spacing={1} wrap={'nowrap'} style={{overflowX:'scroll'}} >
            <Grid item>
              <MyInfoMoim
                color={'#203f52'}
                title={'Dota 2 test test test test test test test test test test test test test test'}
                image={
                  'https://steamcdn-a.akamaihd.net/apps/dota2/images/blog/play/dota_heroes.png'
                }
              />
            </Grid>
            <Grid item>
              <MyInfoMoim
                color={'#4d137f'}
                title={'Fortnite'}
                image={
                  'https://allyourgames.com/wp-content/uploads/2019/09/10.40.png'
                }
              />
            </Grid>
            <Grid item>
              <MyInfoMoim
                color={'#ff9900'}
                title={'Overwatchfjoidjsfddddddddddddddddddddddddddddddddddddddddddddddddddddddd'}
                image={
                  'https://images5.alphacoders.com/690/thumb-1920-690653.png'
                }
              />
            </Grid>
          </Grid>
        </Box>     
      </div>
      
    </div>
  );
};


export default MyInfoMoimContainer;