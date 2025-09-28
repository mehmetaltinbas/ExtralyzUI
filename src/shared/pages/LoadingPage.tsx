import { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';
import type { RoughCanvas } from 'roughjs/bin/canvas';

export function LoadingPage({ isHidden ,message }: {
    isHidden?: boolean;
    message?: string;
}) {
    const roughCanvas = useRef<RoughCanvas>(null);
    const canvasElement = useRef<HTMLCanvasElement>(null);
    const [dotCount, setDotCount] = useState<number>(1);

    useEffect(() => {
        const canvas = canvasElement.current as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        if (canvas) {
            roughCanvas.current = rough.canvas(canvas);
        }
        let interval: ReturnType<typeof setInterval>;
        if (roughCanvas.current) {
            let startAngle = 0;
            const arcSize = Math.PI * 0.75;
            interval = setInterval(() => {
                ctx!.clearRect(0, 0, canvas.width, canvas.height);
                const endAngle = startAngle + arcSize;
                roughCanvas.current!.arc(25, 25, 30, 30, startAngle, endAngle, false);
                startAngle += 0.2;
                if (startAngle >= 2 * Math.PI) {
                    startAngle -= 2 * Math.PI;
                }
            }, 30);
        }

        return () => clearInterval(interval);
    }, [canvasElement]);

    useEffect(() => {
        console.log(`isHidden?: ${isHidden && 'hidden'}`);
        const textInterval = setInterval(() => {
            setDotCount(prev => (prev % 3) + 1);
        }, 1000);
        return () => clearInterval(textInterval);
    }, []);

    return (
        <div className={`${isHidden ? 'hidden' : ''} w-full h-full
            flex justify-center items-start`}
        >
            <div className="w-full h-[50%]
                flex flex-col justify-center items-center"
            >
                <canvas ref={canvasElement} width='50' height='50' className=""></canvas>
                <p>{message ? message : `Loading${'.'.repeat(dotCount)}`}</p>
            </div>
        </div>
    );
}