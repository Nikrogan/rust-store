import styled from "styled-components"

export const Modal = ({ children, onClose, isOpen, title = "Заголовок модалки", buttonGroup }) => {
  
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
       {buttonGroup && <ModalFooter>
        {buttonGroup()}
      </ModalFooter>}
      </ModalContent>
    </ModalBlur>
    )
  }
  
  const CloseModal = () => (
    <svg width="15" height="15" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.7539 1.43377C13.082 1.10578 13.082 0.573991 12.7539 0.245996C12.426 -0.0819987 11.8942 -0.0819987 11.5663 0.245996L6.5 5.31224L1.43379 0.245996C1.10578 -0.0819987 0.57399 -0.0819987 0.245996 0.245996C-0.0819986 0.573991 -0.0819986 1.10578 0.245996 1.43377L5.31223 6.50001L0.245996 11.5662C-0.0819986 11.8943 -0.0819986 12.426 0.245996 12.7541C0.57399 13.082 1.10578 13.082 1.43379 12.7541L6.5 7.68779L11.5663 12.7541C11.8942 13.082 12.426 13.082 12.7539 12.7541C13.082 12.426 13.082 11.8943 12.7539 11.5662L7.68778 6.50001L12.7539 1.43377Z" fill="#A4A4A4"/>
    </svg>
  )
  
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
    border: 1px solid #000000;
  `
  
  const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  `

const ModalFooter = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 32px;
`