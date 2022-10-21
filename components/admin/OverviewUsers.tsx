import {useState , useEffect} from 'react'
import { Avatar, Badge, Table, Group, Text, Select, ScrollArea , Loader ,
         ActionIcon ,} from '@mantine/core';
import { IUser } from '../../helpers/types';
import * as api from "../../helpers/api"
import { UserCircle } from 'tabler-icons-react';


const OverviewUsers = () => {

  const [users, setUsers] = useState<IUser[]>([])
  const [loading, SetLoading] = useState<boolean>(true)

  const update = async () => {
    await api.getAllUsers()
        .then((res) => {
        //   console.log("userssssss ", res);
            setUsers(res as IUser[]);
        });
    SetLoading(false);
}

    const rows = users.map((item) => (
        <tr key={item.id}>
          <td>
            <Group spacing="sm">
            <ActionIcon size='xl' radius='xl'>
              <UserCircle
                size={48}
                strokeWidth={2}
             //   color={'black'}
              />
              </ActionIcon>
              <div>
                <Text size="sm" weight={500}>
                  {item.first_name} {item.last_name}
                </Text>
               {/*  <Text size="xs" color="dimmed">
                  {item.email}
                </Text> */}
              </div>
            </Group>
          </td>
          <td>
              <Text size="sm" weight={500}>
                  {item.email}
                </Text>

          </td>
    
          <td>
           {item.role==="admin"
              ?<Badge  color='yellow'>admin</Badge>
              :<Badge >user</Badge>
           }
          </td>
          <td>
              {item.status==="active"
                  ?<Badge  color='green'>active</Badge>
                  :item.status==="deactivated"
                  ?<Badge  color='violet'>deactivated</Badge>
                  :<Badge  color='red'>suspended</Badge>
              }
          </td>
        </tr>
      ));

      useEffect(() => {
     //   window.scrollTo(0, 0)
        update()
        return () => {
            setUsers([]);
        };
    }, [loading]);


    if (loading === true /* || users===[]  */)

        return <Loader width="100%"
                       size="xl"
                 />

    else
    
    return (
        <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="md" striped>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
    )
}

export default OverviewUsers
