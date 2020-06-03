import React from 'react';
import Color from 'color';
import GoogleFont from 'react-google-font-loader';
import { makeStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MyInfoMoim from '../components/MyInfoMoim'

const useStyles = makeStyles((color:string) => ({
  mediaStyles:{
    width: '100%',
    height: 0,
    paddingBottom: '75%',
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  actionArea: {
    borderRadius: '16',
    transition: '0.2s',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  card: {
    // minWidth: 256,
    width:'108',
    // height:256,  //323.2
    borderRadius: '8',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: `0 6px 12px 0 ${color
        .rotate(-12)
        .darken(0.2)
        .fade(0.5)}`,
    },
  },
  content:{
      backgroundColor: color,
      padding: '1rem 1.5rem 1.5rem',
  },
  title: {
    fontFamily: 'Keania One',
    fontSize: '2rem',
    color: '#fff',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'Montserrat',
    color: '#fff',
    opacity: 0.87,
    marginTop: '2rem',
    fontWeight: 500,
    fontSize: 14,
  },
}));

const MyInfoMoimContainer = () => {
  const styles = useStyles('#203f52');
  const styles2 = useStyles('#4d137f');
  const styles3 = useStyles('#ff9900');
  // const styles2 = useStyles({ color: '#4d137f' });
  // const styles3 = useStyles({ color: '#ff9900' });
  return (
    <div>
      {/**/}
      <div>
        내가 개설한 모임
        <Box /*maxWidth={'calc(100vw - 32px)'}*/ /*m={1}*/ p={1}  overflow={'hidden'}>
          <Grid container /*justify={'center'}*/ spacing={1} wrap={'nowrap'} style={{overflowX:'scroll'}} >
            <Grid item>
              <MyInfoMoim
                classes={styles}
                title={'Dota 2'}
                image={
                  'https://steamcdn-a.akamaihd.net/apps/dota2/images/blog/play/dota_heroes.png'
                }
              />
            </Grid>
            <Grid item>
              <MyInfoMoim
                classes={styles2}
                title={'Fortnite'}
                image={
                  'https://allyourgames.com/wp-content/uploads/2019/09/10.40.png'
                }
              />
            </Grid>
            <Grid item>
              <MyInfoMoim
                classes={styles3}
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
        <Box /*maxWidth={'calc(100vw - 32px)'}*/ /*m={1}*/ p={1} overflow={'hidden'}>
          <Grid container /*justify={'center'}*/ spacing={1} wrap={'nowrap'} style={{overflowX:'scroll'}} >
            <Grid item>
              <MyInfoMoim
                classes={styles}
                title={'Dota 2'}
                image={
                  'https://steamcdn-a.akamaihd.net/apps/dota2/images/blog/play/dota_heroes.png'
                }
              />
            </Grid>
            <Grid item>
              <MyInfoMoim
                classes={styles2}
                title={'Fortnite'}
                image={
                  'https://allyourgames.com/wp-content/uploads/2019/09/10.40.png'
                }
              />
            </Grid>
            <Grid item>
              <MyInfoMoim
                classes={styles3}
                title={'Overwatch'}
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