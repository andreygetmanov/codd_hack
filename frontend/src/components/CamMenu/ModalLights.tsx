import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

interface AddItemProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLights = ({ isOpen, onClose }: AddItemProps) => {
  const [carFlow1, setCarFlow1] = useState(30);
  const [carFlow2, setCarFlow2] = useState(30);
  const [pedestrianInterval, setPedestrianInterval] = useState(15);
  const [pedestrianMode, setPedestrianMode] = useState(false);
  const [greenWave, setGreenWave] = useState(false);
  const [greenWaveDirection, setGreenWaveDirection] = useState("North-South");

  const averageSpeed = 40; // Placeholder for average speed
  const queueLength = 5; // Placeholder for queue length

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "sm", md: "md" }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Настройка светофора</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {/* Изменение временных промежутков для потоков машин */}
          <FormControl mb={4}>
            <FormLabel>Поток 1 (сек)</FormLabel>
            <Slider
              min={10}
              max={120}
              value={carFlow1}
              onChange={setCarFlow1}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text mt={2}>{carFlow1} сек</Text>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Поток 2 (сек)</FormLabel>
            <Slider
              min={10}
              max={120}
              value={carFlow2}
              onChange={setCarFlow2}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text mt={2}>{carFlow2} сек</Text>
          </FormControl>

          {/* Изменение временных интервалов для пешеходов */}
          <FormControl mb={4}>
            <FormLabel>Пешеходный интервал (сек)</FormLabel>
            <Slider
              min={10}
              max={60}
              value={pedestrianInterval}
              onChange={setPedestrianInterval}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text mt={2}>{pedestrianInterval} сек</Text>
          </FormControl>

          {/* Тогглы */}
          <FormControl display="flex" alignItems="center" mb={4}>
            <FormLabel mb={0}>Пешеходный режим</FormLabel>
            <Switch
              isChecked={pedestrianMode}
              onChange={(e) => setPedestrianMode(e.target.checked)}
            />
          </FormControl>

          <FormControl display="flex" alignItems="center" mb={4}>
            <FormLabel mb={0}>Зеленая волна</FormLabel>
            <Switch
              isChecked={greenWave}
              onChange={(e) => setGreenWave(e.target.checked)}
            />
          </FormControl>

          {/* Переключение направления зеленой волны */}
          {greenWave && (
            <FormControl mb={4}>
              <FormLabel>Направление зеленой волны</FormLabel>
              <Input
                value={greenWaveDirection}
                onChange={(e) => setGreenWaveDirection(e.target.value)}
                placeholder="Введите направление"
              />
            </FormControl>
          )}

          {/* Отображение текущих данных */}
          <Box mt={6}>
            <Text fontWeight="bold">Текущие данные:</Text>
            <Text>Поток 1: {carFlow1} сек</Text>
            <Text>Поток 2: {carFlow2} сек</Text>
            <Text>Пешеходный интервал: {pedestrianInterval} сек</Text>
          </Box>

          {/* Средние данные */}
          <Box mt={4}>
            <Text fontWeight="bold">Средние данные:</Text>
            <Text>Скорость проезда: {averageSpeed} км/ч</Text>
            <Text>Длина очереди: {queueLength} машин</Text>
          </Box>
        </ModalBody>

        <ModalFooter gap={3}>
          <Button onClick={onClose} colorScheme="blue">
            Сохранить
          </Button>
          <Button onClick={onClose}>Закрыть</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalLights;