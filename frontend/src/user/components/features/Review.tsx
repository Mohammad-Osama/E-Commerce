import React from 'react'

import { createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper } from '@mantine/core';
import { IReviewInfo } from '../../../helpers/types';
import { Rating } from '@mui/material';

  
  
const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },

  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
    fontSize: theme.fontSizes.sm,
  },

  content: {
    '& > p:last-child': {
      marginBottom: 0,
    },
  },
}));

interface X {
  reviewInfo :IReviewInfo;
}

const Review = (  {reviewInfo}  : X ) => {
  const {id,first_name,last_name,title,text,rating,updatedAt} = reviewInfo


  
    const { classes } = useStyles();


    const author = {
        "name": "ffgg ssrrttttt",
        "image": "https://cdn.pixabay.com/photo/2014/04/02/14/11/male-306408_960_720.png"
             }
     


    return (
        <Paper withBorder radius="md" className={classes.comment} mx="xl" m="xl">
      <Group>
        <Avatar src={author.image} alt={first_name+" "+last_name} radius="xl" />
        <div>
          <Text size="sm">{first_name+" "+last_name}</Text>
          <Text size="xs" color="dimmed">
            {updatedAt}
          </Text>
            <Rating   readOnly={true} 
                      size="small"
                      value={rating}   
                                
                />
        </div>
      </Group>
      <Text size="sm" className={classes.body}>{title}</Text>
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content} dangerouslySetInnerHTML={{ __html: text }} />
      </TypographyStylesProvider>
    </Paper>
    )
}

export default Review
