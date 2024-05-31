import {
	Box,
	Flex,
	Icon,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useColorModeValue
  } from '@chakra-ui/react';
  import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
  } from '@tanstack/react-table';
  import Card from 'components/card/Card';
  import Menu from 'components/menu/MainMenu';
  import * as React from 'react';
  import axios from 'axios';
  import { MdCancel, MdCheckCircle, MdOutlineError } from 'react-icons/md';
  
  type Restaurant = {
	name: string;
	status: string;
	date: string;
	email: string;
  };
  
  const columnHelper = createColumnHelper<Restaurant>();
  
  export default function ComplexTable() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [data, setData] = React.useState<Restaurant[]>([]);
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  
	React.useEffect(() => {
	  // Fetch restaurant data from the API
	  axios.get('/api/restaurants/fetch')
		.then(response => {
		  setData(response.data.restaurants);
		  console.log('data', response.data.restaurants)
		})
		.catch(error => {
		  console.error('Error fetching restaurants:', error);
		});
	}, []);
  
	const columns = [
	  columnHelper.accessor('name', {
		id: 'name',
		header: () => (
		  <Text justifyContent='space-between' align='center' fontSize={{ sm: '10px', lg: '12px' }} color='gray.400'>
			NAME
		  </Text>
		),
		cell: (info: any) => (
		  <Flex align='center'>
			<Text color={textColor} fontSize='sm' fontWeight='700'>
			  {info.getValue()}
			</Text>
		  </Flex>
		)
	  }),
	  columnHelper.accessor('status', {
		id: 'status',
		header: () => (
		  <Text justifyContent='space-between' align='center' fontSize={{ sm: '10px', lg: '12px' }} color='gray.400'>
			STATUS
		  </Text>
		),
		cell: (info) => (
		  <Flex align='center'>
			<Icon
			  w='24px'
			  h='24px'
			  me='5px'
			  color={
				info.getValue() === 'Done' ? (
				  'green.500'
				) : info.getValue() === 'Rejected' ? (
				  'red.500'
				) : info.getValue() === 'Pending' ? (
				  'orange.500'
				) : null
			  }
			  as={
				info.getValue() === 'Done' ? (
				  MdCheckCircle
				) : info.getValue() === 'Rejected' ? (
				  MdCancel
				) : info.getValue() === 'Pending' ? (
				  MdOutlineError
				) : null
			  }
			/>
			<Text color={textColor} fontSize='sm' fontWeight='700'>
			  {info.getValue()}
			</Text>
		  </Flex>
		)
	  }),
	  columnHelper.accessor('date', {
		id: 'date',
		header: () => (
		  <Text justifyContent='space-between' align='center' fontSize={{ sm: '10px', lg: '12px' }} color='gray.400'>
			DATE
		  </Text>
		),
		cell: (info) => (
		  <Text color={textColor} fontSize='sm' fontWeight='700'>
			{new Date(info.getValue()).toLocaleDateString()}
		  </Text>
		)
	  }),
	  columnHelper.accessor('email', {
		id: 'email',
		header: () => (
		  <Text justifyContent='space-between' align='center' fontSize={{ sm: '10px', lg: '12px' }} color='gray.400'>
			EMAIL
		  </Text>
		),
		cell: (info) => (
		  <Text color={textColor} fontSize='sm' fontWeight='700'>
			{info.getValue()}
		  </Text>
		)
	  })
	];
  
	const table = useReactTable({
	  data,
	  columns,
	  state: {
		sorting
	  },
	  onSortingChange: setSorting,
	  getCoreRowModel: getCoreRowModel(),
	  getSortedRowModel: getSortedRowModel(),
	  debugTable: true
	});
  
	return (
	  <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
		<Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
		  <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%'>
			Requests Table
		  </Text>
		  <Menu />
		</Flex>
		<Box>
		  <Table variant='simple' color='gray.500' mb='24px' mt="12px">
			<Thead>
			  {table.getHeaderGroups().map((headerGroup) => (
				<Tr key={headerGroup.id}>
				  {headerGroup.headers.map((header) => {
					return (
					  <Th
						key={header.id}
						colSpan={header.colSpan}
						pe='10px'
						borderColor={borderColor}
						cursor='pointer'
						onClick={header.column.getToggleSortingHandler()}>
						<Flex
						  justifyContent='space-between'
						  align='center'
						  fontSize={{ sm: '10px', lg: '12px' }}
						  color='gray.400'>
						  {flexRender(header.column.columnDef.header, header.getContext())}{{
							asc: '',
							desc: '',
						  }[header.column.getIsSorted() as string] ?? null}
						</Flex>
					  </Th>
					);
				  })}
				</Tr>
			  ))}
			</Thead>
			<Tbody>
			  {table.getRowModel().rows.map((row) => {
				return (
				  <Tr key={row.id}>
					{row.getVisibleCells().map((cell) => {
					  return (
						<Td
						  key={cell.id}
						  fontSize={{ sm: '14px' }}
						  minW={{ sm: '150px', md: '200px', lg: 'auto' }}
						  borderColor='transparent'>
						  {flexRender(cell.column.columnDef.cell, cell.getContext())}
						</Td>
					  );
					})}
				  </Tr>
				);
			  })}
			</Tbody>
		  </Table>
		</Box>
	  </Card>
	);
  }
  