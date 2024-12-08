import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
  } from "@chakra-ui/react"
import VideoPlayer from "./VideoPlayer"

  
  interface AddItemProps {
    isOpen: boolean
    onClose: () => void
  }
  
  const ModalViev = ({ isOpen, onClose }: AddItemProps) => {  
    return (
      <>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size={{ base: "sm", md: "md" }}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Камера</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <VideoPlayer
                src="blob:https://ipeye.ru/6e6f4efd-3185-4f87-9da7-d66aa74f92fd"
                poster="//api.ipeye.ru/v1/stream/poster/1/64406285bff947e7879a5e7da52e3027/img.jpeg"
                autoplay
                muted
                playsInline
                className="video-player"
            />
            </ModalBody>
            <ModalFooter gap={3}>
              <Button onClick={onClose}>Закрыть</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
  
  export default ModalViev