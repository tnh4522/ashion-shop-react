import {useContext} from 'react'
import {ShowOffCanvasContext} from '../contexts/ShowOffCanvasContext'

const useShowOffCanvasContext = () => {
    return useContext(ShowOffCanvasContext);
}

export default useShowOffCanvasContext;
