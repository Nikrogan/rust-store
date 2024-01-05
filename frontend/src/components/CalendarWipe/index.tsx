import { Modal } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks";
import './styled.css';

export const CalendarWipe = ({isOpen, onClose}) => {
    const isMobile = useMediaQuery('(max-width: 50em)');

    return <Modal 
        opened={isOpen} 
        onClose={onClose} 
        title="Календарь вайпов" 
        transitionProps={{ transition: 'fade', duration: 300 }}
        fullScreen={isMobile}
        centered
        
    >
    
    </Modal>
}