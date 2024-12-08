import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BsThreeDotsVertical } from "react-icons/bs"
import { FiCheckSquare, FiNavigation } from "react-icons/fi"
import { ApartsService } from "../../client"
import type { Apart, TDataCheckedApart } from "../../client"
import useCustomToast from "../../hooks/useCustomToast"


interface ActionsMenuProps {
  value: Apart
  disabled?: boolean
}

const ActionsMenuApart = ({ value, disabled }: ActionsMenuProps) => {
  console.log(value)
  const showToast = useCustomToast()
  const queryClient = useQueryClient()
  const onSubmit = async () => {
    mutation.mutate({idRep: value.id_rep} as TDataCheckedApart)
  }

  const mutation = useMutation({
    mutationFn: ApartsService.checkedApart,
    onSuccess: () => {
      showToast(
        "Успешно.",
        `Заявка успешно отмечена как просмотренная.`,
        "success",
      )
    },
    onError: () => {
      showToast(
        "An error occurred.",
        `An error occurred while checking the Apart.`,
        "error",
      )
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["Aparts"],
      })
    },
  })

  const openOnMap = () => {
    const { latitude, longitude } = value
    // Конструируем URL с координатами
    const url = `control/?lt_loc=${latitude}&ln_loc=${longitude}`
    window.location.href = url // Переход по новому адресу
  }


    
  return (
    <>
      <Menu>
        <MenuButton
          isDisabled={disabled}
          as={Button}
          rightIcon={<BsThreeDotsVertical />}
          variant="unstyled"
        />
        <MenuList>
          <MenuItem
            onClick={() => onSubmit()}
            icon={<FiCheckSquare fontSize="16px" />}
          >
            Просмотренно 
          </MenuItem>
          <MenuItem
            onClick={openOnMap} // Обработчик для перехода на карту с координатами
            icon={<FiNavigation fontSize="16px" />}
          >
            Открыть на карте 
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default ActionsMenuApart
