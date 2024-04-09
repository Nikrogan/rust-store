import styled from "styled-components"

export const Modal = ({ children, onClose, isOpen, title = "Заголовок модалки" }) => {
  
    return isOpen && (
    <ModalBlur>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            {title}
          </ModalTitle>
          {onClose && <CloseModalContainer onClick={onClose}>
              <CloseModal />
            </CloseModalContainer>}
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalBlur>
    )
  }
  
  const CloseModal = () => {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24 2.41714L21.5829 0L12 9.58286L2.41714 0L0 2.41714L9.58286 12L0 21.5829L2.41714 24L12 14.4171L21.5829 24L24 21.5829L14.4171 12L24 2.41714Z" fill="white"/>
    </svg>
    )
  }
  
  const CloseModalContainer = styled.div`
    cursor: pointer;
  `
  
  const ModalTitle = styled.div`
    font-size: 32px;
  `
  
  const ModalBlur = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    z-index: 9000;
    display: flex;
    align-content: center;
    align-items: center;
    flex-direction: column;
    background: rgba(26, 26, 26, 0.7);
    backdrop-filter: blur(1px);
    justify-content: center;
  `
  
  const ModalContent = styled.div`
    padding: 16px;
    background: #1A1A1A;
    width: 750px;
    height: 430px;
    border: 1px solid #000000;
  `
  
  const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  `