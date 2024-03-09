import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Heading, IconButton, Input, HStack, StackDivider, useColorMode, useColorModeValue, Spacer, Text, Button } from "@chakra-ui/react";
import { FaSun, FaMoon, FaTrash, FaPlus } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.100");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleAddTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const handleRemoveTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <ChakraProvider>
      <Box p={4} bg={bgColor} minH="100vh">
        <VStack spacing={8}>
          <IconButton icon={colorMode === "light" ? <FaSun /> : <FaMoon />} isRound={true} size="md" alignSelf="flex-end" onClick={toggleColorMode} />
          <VStack spacing={4} divider={<StackDivider />}>
            <Heading mb={6} color={textColor}>
              Todo App
            </Heading>
            <HStack>
              <Input value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="Add a new task" />
              <IconButton icon={<FaPlus />} onClick={handleAddTodo} colorScheme="blue" aria-label="Add todo" />
            </HStack>
            <VStack divider={<StackDivider />} borderColor="gray.200" borderWidth="2px" p={4} borderRadius="md" w="100%" maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }} alignItems="stretch">
              {todos.map((todo, index) => (
                <HStack key={index}>
                  <Text p={4} color={textColor}>
                    {todo}
                  </Text>
                  <Spacer />
                  <IconButton icon={<FaTrash />} onClick={() => handleRemoveTodo(index)} colorScheme="red" aria-label="Delete todo" />
                </HStack>
              ))}
            </VStack>
          </VStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
