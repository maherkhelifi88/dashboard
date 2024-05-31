// Chakra imports
import { Flex, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HorizonLogo } from 'components/icons/Icons';
import { HSeparator } from 'components/separator/Separator';

export function SidebarBrand() {
	//   Chakra color mode
	let logoColor = useColorModeValue('navy.700', 'white');

	return (
		<Flex alignItems='center' flexDirection='column'>
			<img
                  src="/img/dashboards/logo.svg"
                  alt="logo"
                  width={260}
                  height={80}
                  className="w-full dark:hidden"
                />
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;
