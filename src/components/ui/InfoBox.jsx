import { useEffect, useRef } from 'react';

export function InfoBox({onClickOutside, show, setCurrentId, id, setOpenConfirmation}) {

    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    if (!show)
        return null;

    return (


        <div className='window-card'
            ref={ref}
        >
            <p className='font-normal mb-05'>Send report</p>
            <p className='font-normal'
                onClick={() => {
                    setCurrentId(id)
                    setOpenConfirmation(true)
                }}
            >Delete</p>
        </div>
    )
}