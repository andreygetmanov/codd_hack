import React, { useEffect, useState, useRef } from 'react';
import { Box, Container } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { Bulvar, BulvarsService } from "../../client";

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

function Dashboard() {
  const [Depo, setDepo] = useState<Bulvar[]>([]);

  useEffect(() => {
    async function fetchDepoData() {
      try {
        const response = await BulvarsService.readBulvars();
        setDepo(response.data as Bulvar[]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchDepoData();
  }, []);

  // Сортировка данных по `depo`
  const sortedData: Record<string, Bulvar[]> = Depo.reduce((acc: Record<string, Bulvar[]>, item) => {
    if (!acc[item.depo]) {
      acc[item.depo] = [];
    }
    acc[item.depo].push(item);
    return acc;
  }, {});

  return (
    <Container>
      {Object.entries(sortedData).slice(0, 6).map(([depo, data]) => (  // Ограничим отображение только 6 адресами
        <Box key={depo} mb={10}>
          <h3>{depo}</h3>
          <Graph data={data} />
        </Box>
      ))}
    </Container>
  );
}

// Компонент для отрисовки графиков
const Graph: React.FC<{ data: Bulvar[] }> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);  // Используем только один канвас для каждого депо

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        drawGraph(ctx, data.map((d) => d.nfs));
      }
    }
  }, [data]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <canvas
        ref={canvasRef}
        width="300"
        height="200"
        style={{ border: '1px solid black', margin: '10px' }}
      />
    </div>
  );
};

// Функция для отрисовки графика
function drawGraph(ctx: CanvasRenderingContext2D, nfsValues: number[]) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  // Очистка холста
  ctx.clearRect(0, 0, width, height);

  // Настройки графика
  const maxVal = Math.max(...nfsValues);
  const minVal = Math.min(...nfsValues);
  const padding = 20;
  const scaleX = (width - padding * 2) / (nfsValues.length - 1);
  const scaleY = (height - padding * 2) / (maxVal - minVal);

  // Рисование осей
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding); // X-axis
  ctx.lineTo(padding, padding); // Y-axis
  ctx.stroke();

  // Рисование линии графика
  ctx.beginPath();
  ctx.strokeStyle = 'blue';
  nfsValues.forEach((val, i) => {
    const x = padding + i * scaleX;
    const y = height - padding - (val - minVal) * scaleY;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();

  // Рисование точек
  ctx.fillStyle = 'red';
  nfsValues.forEach((val, i) => {
    const x = padding + i * scaleX;
    const y = height - padding - (val - minVal) * scaleY;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}
