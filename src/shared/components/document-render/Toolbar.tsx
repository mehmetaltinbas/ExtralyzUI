import { BlackButton } from 'src/shared/components/buttons/BlackButton';
import type { PaginatedDocument } from 'src/shared/types/paginated-document.interface';

export function Toolbar({ paginatedDocument }: { paginatedDocument: PaginatedDocument }) {

    function onClick() {

    }

    return (
        <div className="h-full fixed right-0 top-0 p-2 flex flex-col justify-center pointer-events-none">
            <div className="px-2 py-1 border flex flex-col justify-center items-center gap-2 bg-white rounded-[10px] pointer-events-auto">
                <p>toolbar</p>
                <div className='flex justify-center items-center gap-1'>
                    <p>font-size</p>
                    <input type='number' className='border w-[40px] h-auto rounded-[2px]'/>
                </div>
                <BlackButton onClick={onClick}>bold</BlackButton>
                <BlackButton onClick={onClick}>italic</BlackButton>
            </div>
        </div>
    );
}
