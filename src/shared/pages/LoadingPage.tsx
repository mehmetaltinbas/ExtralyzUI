import { useEffect, useRef } from 'react';
import rough from 'roughjs';
import type { RoughCanvas } from 'roughjs/bin/canvas';

export function LoadingPage({ message }: {
    message?: string;
}) {
    const roughCanvas = useRef<RoughCanvas>(null);

    useEffect(() => {
        const canvas = document.getElementById('loadingPageCanvas') as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        if (canvas) {
            roughCanvas.current = rough.canvas(canvas);
        }
        let interval: ReturnType<typeof setInterval>;
        if (roughCanvas.current) {
            let startAngle = 0;
            let endAngle = Math.PI * 0.75;
            interval = setInterval(() => {
                ctx!.clearRect(0, 0, canvas.width, canvas.height);
                roughCanvas.current!.arc(25, 25, 35, 35, startAngle, endAngle, false);
                startAngle += 0.2;
                endAngle += 0.2;
                console.log(`startAngle: ${startAngle}, endAngle: ${endAngle}`);
                if (startAngle >= 2 * Math.PI) {
                    startAngle = 0;
                }
                if (startAngle === 0 && endAngle >= 2 * Math.PI) {
                    endAngle -= 2*Math.PI;
                }
            }, 30);
        }

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full
            flex justify-center items-start"
        >
            <div className="w-full h-[50%]
                flex flex-col justify-center items-center"
            >
                <canvas id="loadingPageCanvas" width='50' height='50' className=""></canvas>
                <p>{message ? message : 'Loading...'}</p>
            </div>
        </div>
    );
}