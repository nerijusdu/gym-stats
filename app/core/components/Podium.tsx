import { Flex, Text } from "@chakra-ui/react";

export type PodiumProps = {
  names: [string?, string?, string?];
};

const Podium : React.FC<PodiumProps> = ({ names }) => {
  return (
    <Flex align="flex-end">
      <PodiumColumn name={names[1]} place={2} />
      <PodiumColumn name={names[0]} place={1} />
      <PodiumColumn name={names[2]} place={3} />
    </Flex>
  );
};

export type PodiumColumnProps = {
  place: 1 | 2 | 3,
  name?: string,
};

const colorMap = {
  1: 'gold',
  2: 'silver',
  3: '#CD7F32'
};

const textColorMap = {
  1: 'yellow.500',
  2: 'gray.500',
  3: 'yellow.700'
};

const PodiumColumn : React.FC<PodiumColumnProps> = ({ place, name }) => {
  const height = `${(4 - place) * 20 + 20}px`;

  return (
    <Flex direction="column" align="center">
      <Text pb={2}>{name}</Text>
      <Flex
        m="1px"
        rounded={4}
        shadow="md"
        px={[8, 12, 16]}
        pt={1}
        h={height}
        bg={colorMap[place]}
        color="white"
      >
        <Text rounded="full" bg={textColorMap[place]} h={7} w={7} align="center">
          {place}
        </Text>
      </Flex>
    </Flex>
  );
};
export default Podium;
