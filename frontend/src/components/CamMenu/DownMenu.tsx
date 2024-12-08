import {
    Box,
    Text,
    useColorModeValue,
    Button
  } from "@chakra-ui/react"
  //import { useQueryClient } from "@tanstack/react-query"

  
 
  //import type { UserPublic } from "../../client"
  //import useAuth from "../../hooks/useAuth"
  
  
  const DownMenu = (selectedKvF:string|null,handleNavigate:any, handleCloseMenu:any) => {
    //const queryClient = useQueryClient()
    const bgColor = useColorModeValue("ui.light", "ui.dark")
    const textColor = useColorModeValue("ui.dark", "ui.light")
    //const secBgColor = useColorModeValue("ui.secondary", "ui.darkSlate")
    //const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
    //const { logout } = useAuth()
  
    //const handleLogout = async () => {
    //  logout()
    //}
  
    return (
      <>
        {/* Desktop */}
        <Box
            position="absolute" 
            bottom={0}  // Привязываем меню к низу родительского блока 
            bg={bgColor}
            color={textColor}
            border="1px solid #ccc"
            boxShadow="lg"
            borderRadius="8px"
            p={4}
            zIndex={1000}  // Устанавливаем высокий z-index, чтобы меню перекрывало другие элементы
          >
            <Text fontWeight="bold">Информация о камере:</Text>
            <Text>{selectedKvF}</Text>
            <Button onClick={handleNavigate} colorScheme="blue" mt={2}>
              Перейти
            </Button>
            <Button onClick={handleCloseMenu} colorScheme="red" mt={2}>
              Отмена
            </Button>
          </Box>
      </>
    )
  }
  
  export default DownMenu