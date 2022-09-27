import {useState , useEffect} from 'react'
import { Avatar, Badge, Table, Group, Text, Select, ScrollArea , Loader } from '@mantine/core';
import { IUser } from '../../helpers/types';
import * as api from "../../helpers/api"



const data =  [
    {
      "avatar": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Robert Wolfkisser",
      "job": "Engineer",
      "email": "rob_wolf@gmail.com",
      "role": "Collaborator"
    },
    {
      "avatar": "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Jill Jailbreaker",
      "job": "Engineer",
      "email": "jj@breaker.com",
      "role": "Collaborator"
    },
    {
      "avatar": "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Henry Silkeater",
      "job": "Designer",
      "email": "henry@silkeater.io",
      "role": "Contractor"
    },
    {
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Bill Horsefighter",
      "job": "Designer",
      "email": "bhorsefighter@gmail.com",
      "role": "Contractor"
    },
    {
      "avatar": "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Jeremy Footviewer",
      "job": "Manager",
      "email": "jeremy@foot.dev",
      "role": "Manager"
    }
  ]
interface UsersTableProps {
    data: { avatar: string; name: string; job: string; email: string; role: string }[];
  }

  const rolesData = ['Manager', 'Collaborator', 'Contractor'];


const OverviewUsers = () => {

  const [users, setUsers] = useState<IUser[]>([])
  const [loading, SetLoading] = useState<boolean>(true)

  const update = async () => {
    await api.getAllUsers()
        .then((res) => {
           console.log("userssssss ", res);
            setUsers(res as IUser[]);
        });
    SetLoading(false);
}

    const rows = data.map((item) => (
        <tr key={item.name}>
          <td>
            <Group spacing="sm">
              <Avatar size={40} src={item.avatar} radius={40} />
              <div>
                <Text size="sm" weight={500}>
                  {item.name}
                </Text>
                <Text size="xs" color="dimmed">
                  {item.email}
                </Text>
              </div>
            </Group>
          </td>
    
          <td>
            <Select data={rolesData} defaultValue={item.role} variant="unstyled" />
          </td>
          <td>{Math.floor(Math.random() * 6 + 5)} days ago</td>
          <td>
            {Math.random() > 0.5 ? (
              <Badge fullWidth>Active</Badge>
            ) : (
              <Badge color="gray" fullWidth>
                Disabled
              </Badge>
            )}
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


    if (loading === true || users===[] )

        return <Loader width="100%"
                       size="xl"
                 />

    else
    
    return (
        <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="md">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Role</th>
            <th>Last active</th>
            <th>Status</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
    )
}

export default OverviewUsers
