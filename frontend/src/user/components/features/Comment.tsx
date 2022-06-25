import React from 'react'

import { createStyles, Text, Avatar, Group, TypographyStylesProvider, Paper } from '@mantine/core';

    
   
    
 
  
  
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

interface CommentHtmlProps {
  postedAt: string;
  body: string;
  author: {
    name: string;
    image: string;
  };
}

const Comment = () => {
    const { classes } = useStyles();


    const postedAt = "10 minutes ago"
    const author = {
        "name": "ffgg ssrrttttt",
        "image": "https://cdn.pixabay.com/photo/2014/04/02/14/11/male-306408_960_720.png"
             }
     const body = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam"


    return (
        <Paper withBorder radius="md" className={classes.comment} mx="xl">
      <Group>
        <Avatar src={author.image} alt={author.name} radius="xl" />
        <div>
          <Text size="sm">{author.name}</Text>
          <Text size="xs" color="dimmed">
            {postedAt}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content} dangerouslySetInnerHTML={{ __html: body }} />
      </TypographyStylesProvider>
    </Paper>
    )
}

export default Comment
