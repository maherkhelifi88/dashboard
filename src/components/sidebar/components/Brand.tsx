// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';
import Image from 'next/image';
import logo from './logo.svg'
export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<Image
                  src={logo}
                  alt="Kanteen"
                  width={260}
                  height={80}
                  className="w-full dark:hidden"
                />
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
