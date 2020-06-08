import React from 'react';
import GoogleFont from 'react-google-font-loader';
import NoSsr from '@material-ui/core/NoSsr';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MyInfoMoim from '../components/MyInfoMoim'

type MyInfoMoimListProps ={
  moims: Array<any>
}

function _deleteMoim(){
  console.log("지움")
  //리랜더
}

const MyInfoMoimList = ({moims} : MyInfoMoimListProps) => {
  const getMoim = moims.map((data:any, index: number) => <MyInfoMoim
                                                              data={data}
                                                              key={index}
                                                              isDelete={_deleteMoim}/>)
  return (
    <div>
      <Box p={1}  overflow={'hidden'}>
        <Grid container spacing={1} wrap={'nowrap'} style={{overflowX:'scroll'}} >
            {getMoim}
        </Grid>
      </Box>
    </div>
  );
};


export default MyInfoMoimList;