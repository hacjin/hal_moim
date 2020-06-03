import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
interface Props {
    classes : any,
    image: string,
    title: string,
}
const MyInfoMoim = ({ classes, image, title }:Props) => {
    console.log("classes.actionArea ",classes.actionArea)
    console.log("classes.card",classes.card)
    console.log("classes.content",classes.content)
    console.log("classes.title",classes.title)
  
    console.log("==================================")
  
    // console.log("image", image)
    // console.log('title',title)
    // console.log('subtitle',subtitle)
    return (
      <CardActionArea className={classes.actionArea}>
        <Card className={classes.card}>
          <CardMedia classes={classes.mediaStyles} image={image} />
          <CardContent className={classes.content}>
            <Typography className={classes.title} style={{fontSize : '14px'}} variant={'h2'}>
              {title}
            </Typography>
            {/* <Typography className={classes.subtitle} style={{marginTop:'2px'}}>{subtitle}</Typography> */}
          </CardContent>
        </Card>
      </CardActionArea>
    );
  };


  export default MyInfoMoim;