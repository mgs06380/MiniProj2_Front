import {
  Box,
  useColorModeValue,
  Stack,
  Button,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { TbHomeHeart } from 'react-icons/tb'
import { PiFinnTheHumanDuotone } from "react-icons/pi";
import AuthContext from '../context/AuthContext';
import AddPost from '../pages/AddPost';
import NavItem from './NavItem';

function Nav() {
  const {user} = useContext(AuthContext)
  return (
    <Box left={{lg:4}} zIndex={1} w={{ sm: "100%", lg: '30vh' }} position={{ sm:'sticky', lg: 'fixed' }} px={5}>
      <Stack
        bg={'white'}
        color={useColorModeValue('gray.600', 'white')}
        borderRadius={"2xl"}
        spacing={'10'}
        p={'10px'}
        pt={{lg:'10vh'}}
        h={{ sm: '20', lg: '95vh' }}
        direction={{ sm: 'row', lg: 'column' }}
        boxShadow={'2xl'}
      >
        <NavItem description={'Home'} icon={<TbHomeHeart />} path={"/home"}/>
        {user ? (
          <NavItem description={'Profile'} icon={<PiFinnTheHumanDuotone />} path={`/profile/${user.id}`} />
        ) : (
          <NavItem description={'Profile'} icon={<PiFinnTheHumanDuotone />} path={"/login"} />
        )}

        <AddPost />

      
      </Stack>
    </Box>
  )
}

export default Nav