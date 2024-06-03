'use client';
import { Box, SimpleGrid , Button} from '@chakra-ui/react';
import CheckTable from 'views/admin/dataTables/components/CheckTable';
import tableDataCheck from 'views/admin/dataTables/variables/tableDataCheck';
import React, { useState } from 'react';
import { Alert } from '@mui/material';
import axios from 'axios';
export default function DataTables() {
  const [email, setEmail] = useState('');
  const [newLink, setNewLink] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);


 

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="20%"
              h="50"
              mb="24px"
            
            >
              Change link 
            </Button>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 1 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        
        <CheckTable/>
      </SimpleGrid>
    </Box>
  );
}
