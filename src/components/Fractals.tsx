import { useEffect, useRef } from "react";

interface FractalProps {
  dob: string; // Date of Birth
  zodiac: string; // Zodiac Sign
}

const Fractals = ({ dob, zodiac }: FractalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const [year, month, day] = dob.split("-").map(Number);

    // Parameters derived from DOB and Zodiac
    const scale = 2 + month / 12; // Scale factor from month
    const maxIter = 100 + year % 100; // Iterations from year
    const colorShift = zodiac.length * 15; // Simple zodiac-based shift

    // Canvas size
    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.createImageData(width, height);

    // Fractal bounds
    const xmin = -scale;
    const xmax = scale;
    const ymin = -scale;
    const ymax = scale;

    for (let px = 0; px < width; px++) {
      for (let py = 0; py < height; py++) {
        const x0 = xmin + (xmax - xmin) * px / width;
        const y0 = ymin + (ymax - ymin) * py / height;

        let x = 0, y = 0;
        let iter = 0;

        while (x * x + y * y <= 4 && iter < maxIter) {
          const xTemp = x * x - y * y + x0;
          y = 2 * x * y + y0;
          x = xTemp;
          iter++;
        }

        const pixelIndex = (py * width + px) * 4;
        const color = iter === maxIter ? 0 : (iter * colorShift) % 255;
        imgData.data[pixelIndex] = color; // R
        imgData.data[pixelIndex + 1] = color; // G
        imgData.data[pixelIndex + 2] = color; // B
        imgData.data[pixelIndex + 3] = 255; // A
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [dob, zodiac]);

  return <canvas ref={canvasRef} width={800} height={800} className="border" />;
};

export default Fractals;