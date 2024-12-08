import { Box, Container} from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { YMaps, Map, Placemark, TrafficControl, TypeSelector, Button } from '@pbe/react-yandex-maps';


//import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from 'react';
import { CamerasService } from "../../client"; 
import { Camera } from "../../client";
import DownMenu from "../../components/CamMenu/DownMenu"
import ModalViev from "../../components/CamMenu/Modal"
import ModalLights from "../../components/CamMenu/ModalLights";
export const Route = createFileRoute("/_layout/control")({
    component: Control
  })

  export type Lights = {
	lt_loc: number;
	ln_loc: number;
	name: string;
	id?: number;
};






function Control() {
  // Состояние для управления модальным окном
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenL, setModalOpenL] = useState(false);
  // Функция для открытия модального окна
  const openModal = () => setModalOpen(true);
  const openModalL = () => setModalOpenL(true);
  // Функция для закрытия модального окна
  const closeModal = () => setModalOpen(false);
  const closeModalL = () => setModalOpenL(false);
  //const { user: currentUser } = useAuth();
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [lights, setLights] = useState<Lights[]>([]);
  const [showCameras, setShowCameras] = useState(false);
  const [showLights, setShowLights] = useState(false);
 
  const [markerCoords, setMarkerCoords] = useState<[number, number] | null>(null); // Для хранения координат метки из URL
  //const [error, setError] = useState(null);
  useEffect(() => {
    setLights([{lt_loc: 45.040045, id: 115, name: "'г.Краснодар ул.Красная - ул.Северная '", ln_loc: 38.976148}])
    // Извлечение параметров из URL
    const urlParams = new URLSearchParams(window.location.search);
    const lt_loc = parseFloat(urlParams.get('lt_loc') || '0');
    const ln_loc = parseFloat(urlParams.get('ln_loc') || '0');

    // Устанавливаем координаты метки, если они есть в URL
    if (!isNaN(lt_loc) && !isNaN(ln_loc)) {
      setMarkerCoords([lt_loc, ln_loc]);
    }
    
    async function fetchCamerasData() {
      try {
        const response = await CamerasService.readCameras({ limit: 10000, skip: 0 });
        // Приводим к типу Camera[], извлекая массив камер из поля data в ответе
        setCameras(response.data); // response.data - это массив Camera[]
      } catch (err) {
        // Обработка ошибки
        console.error(err);
      }
    }
    fetchCamerasData();
  }, []); // Пустой массив зависимостей для однократного выполнения

  const toggleCameras = () => {
    setShowCameras(!showCameras); // Переключение состояния видимости камер
  };
  const toggleLights = () => {
    setShowLights(!showLights); // Переключение состояния видимости камер
  };
  
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedKvF, setSelectedKvF] = useState<string | null>(null);

  const handlePlacemarkClick = (e: any, index: number) => {
    // Получаем позицию мыши на экране относительно окна браузера
    const { clientX, clientY } = e.get("domEvent");  // Извлекаем clientX и clientY из события

  
    setMenuPosition({
      x: clientX,  // Используем координаты мыши по оси X
      y: clientY,  // Используем координаты мыши по оси Y
    });
  
    setSelectedKvF(cameras[index]?.name || "Описание отсутствует");
  };


  //const handleNavigate = () => {
  //  openModal;
  //};

  const handleCloseMenu = () => {
    setMenuPosition(null);
  };

  console.log(markerCoords)
  console.log(cameras)
  return (
    <>
      <Container maxW="full" paddingTop={50} >
        <Box h="calc(85vh)" m={4}>
          <YMaps>
            <Map defaultState={{ center: [45.035474, 38.976738], zoom: 10 }} width="100%" height="100%">
              <Button
                options={{ maxWidth: 128 }}
                onClick={toggleCameras}
                data={{ content: "Камеры" }}
                defaultState={{ selected: false }}
              />
              <Button
                options={{ maxWidth: 128 }}
                onClick={toggleLights}
                data={{ content: "Светофоры" }}
                defaultState={{ selected: false }}
              />
              <TypeSelector />
              <TrafficControl />
              {/* Генерация светофоров по массиву данных */}
              {showLights && lights.map((lig:Lights) => (
                <Placemark
                  key={lig.id}
                  geometry={[lig.lt_loc,lig.ln_loc]}
                  options={{ iconColor: 'yelow' }}
                  onClick={() => openModalL()}
                  />  
              ))}
              {/* Генерация Placemark по массиву данных */}
              {showCameras && cameras.map((cam:Camera) => (
                <Placemark
                  key={cam.id_cam}
                  geometry={[cam.lt_loc,cam.ln_loc]}
                  onClick={(e:any) => handlePlacemarkClick(e, cam.id_cam ? cam.id_cam : NaN)}
                  />  
              ))}
              {/* Отображаем метку с координатами из URL */}
              {markerCoords && (
                <Placemark
                  key="marker"
                  geometry={markerCoords}
                  options={{ iconColor: 'red' }}
                />
              )}
            </Map>
          </YMaps>
          {menuPosition && (
            DownMenu(selectedKvF, openModal, handleCloseMenu)
          )}
          {/* Внедрение модального окна */}
        </Box>
      </Container>
      <ModalViev isOpen={isModalOpen} onClose={closeModal} />
      <ModalLights isOpen={isModalOpenL} onClose={closeModalL} />
    </>
  );
}