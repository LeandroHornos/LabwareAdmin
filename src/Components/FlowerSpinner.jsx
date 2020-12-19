import React, { useState, useEffect, useRef } from "react";

const FlowerSpinner = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  //   const [isDrawing, setIsDrawing] = useState(false);

  //   const startDrawing = ({ nativeEvent }) => {
  //     const { offsetX, offsetY } = nativeEvent;
  //     contextRef.current.beginPath();
  //     contextRef.current.moveTo(offsetX, offsetY);
  //     setIsDrawing(true);
  //   };

  //   const draw = ({ nativeEvent }) => {
  //     if (!isDrawing) {
  //       return;
  //     }
  //     const { offsetX, offsetY } = nativeEvent;
  //     contextRef.current.lineTo(offsetX, offsetY);
  //     contextRef.current.stroke();
  //   };

  //   const stopDrawing = () => {
  //     contextRef.current.closePath();
  //     setIsDrawing(false);
  //   };

  useEffect(() => {
    /* Creo el canvas al cargarse el componente. 
    Duplico el tamaño respecto a la ventana y escalo 
    a la mitad para aumentar la densidad de pixeles */
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = "100%";
    canvas.style.height = "100vh";

    const ctx = canvas.getContext("2d");

    ctx.scale(2, 2);
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    contextRef.current = ctx;

    // FLOWER
    // Config
    let size = 3;
    let number = 0;
    let scale = 6;
    let limit = 300;
    let factor = 3;

    const drawFlower = () => {
      let radius = scale * Math.sqrt(number);
      let angle = number * factor;
      let positionX = canvas.width / 2 + radius * Math.sin(angle);
      let positionY = canvas.height / 2 + radius * Math.cos(angle);

      if (number > limit) {
        number = 0;
        radius = scale * Math.sqrt(number);
        angle = number * factor;
        size = 3;
        positionX = canvas.width / 2 + radius * Math.sin(angle);
        positionY = canvas.height / 2 + radius * Math.cos(angle);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      number++;
      size -= 0.009;

      ctx.fillStyle = `green`;
      ctx.strokeStyle = `green`;
      ctx.lineWidth = 0;

      // Draw
      ctx.beginPath();
      ctx.arc(positionX, positionY, size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      console.log("dibujo flor")
    };

    const animate = () => {
      drawFlower();
      requestAnimationFrame(animate);
    };

    animate();
    /////////
  }, []);

  return (
    <canvas
      ref={canvasRef}
    />
  );
};

export default FlowerSpinner;
