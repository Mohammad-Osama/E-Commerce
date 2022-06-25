import React from 'react'
import { Textarea ,Text , Paper ,Button , Group} from '@mantine/core';
import {  LetterC } from 'tabler-icons-react';
import { Rating } from '@mui/material';




const AddComment = () => {
    
    return (
        <Paper withBorder radius="md" mx="xl">
        {/* <Text  mx="xl">
            Add a comment
        </Text> */}
        <Textarea mx="xl"
                placeholder="Your comment"
                label="Add a comment"
                radius="md"
                size="md"
                required
                icon={<LetterC/>}
                autosize
                minRows={3}
                maxRows={3}
               />
               <br/>
               <Group spacing="xl" position="center" m="xl">
            <Rating   name="read-only"
                size="small"
                
                                  
            />
            <Button>Add Comment</Button>
            </Group>
            
    </Paper>
    )
}

export default AddComment
