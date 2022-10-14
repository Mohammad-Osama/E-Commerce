import React, { useRef } from 'react';
import { Text, Group, Button, createStyles, useMantineTheme, MantineTheme, Image } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { CloudUpload } from 'tabler-icons-react';



const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: 20,
  },

  dropzone: {
    borderWidth: 1,
    paddingBottom: 50,
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  control: {
    position: 'relative',
    width: 250,
    marginBottom: '10px',
    left: 'calc(50% - 125px)',
  },
}));

/* function getActiveColor(status: DropzoneStatus, theme: MantineTheme |any) {
  return status.accepted
  ? theme.colors[theme.primaryColor][6]
    : status.rejected
      ? theme.colors.red[6]
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.black;
} */


interface InputImageProps {
  data: string
  formFunc: (input: File[]) => void
}
// height='360px' radius='md'
export default function PhotoImport({ data, formFunc }: InputImageProps) {
  const theme = useMantineTheme();
  const { classes } = useStyles();


  const openRef = useRef<any>()  // any bc kept getting errors below 

  function imgRender(imgData: string) {
    if (imgData) {
      return <Image src={imgData}
        height={200}
        width={90} />
    }
  }
  return (
    <div className={classes.wrapper}>
      <Dropzone
        multiple={false}
        openRef={openRef
          ? openRef // as React.ForwardedRef<() => void>
          : undefined}
        onDrop={(file) => formFunc(file)}
        className={classes.dropzone}
        radius="md"
        accept={IMAGE_MIME_TYPE}
        maxSize={2 * 1024 ** 2}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group position="center">
            <Dropzone.Accept>
              <CloudUpload size={50} color="red" /* stroke={1.5} */ />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <CloudUpload size={50} color="red" /* stroke={1.5} */ />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <CloudUpload
                size={50}
                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
              /* stroke={1.5} */
              />
            </Dropzone.Idle>
          </Group>

          <Text align="center" size="sm" mt="xs" color="dimmed">
            Drag&apos;n&apos;drop files here to upload. We can accept only <i>.jpg</i> files that
            are less than 2mb in size.
          </Text>
        </div>


      </Dropzone >

      <Button className={classes.control} size="md"
        radius="xl"
        onClick={() => openRef.current()
        }
      >
        Select Photo
      </Button>
      <div >
        {imgRender(data)}
      </div>
    </div >
  );
}

