import { useState } from 'react';

function App() {
    const [count, setCount] = useState(0);

    const object = (parent: unknown) : string => {
        console.log(parent);
        return 'hello';
    };

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <p className='text-sky-600'>what is up</p>
        </div>
    );
}

export default App;
