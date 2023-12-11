import React from "react"
import { Modal } from "flowbite-react"
import useModal from "./useModal" // Asegúrate de que la ruta de importación sea correcta
import { ImodalProp } from "./ImodalProp"

const ModalComponent: React.FC<ImodalProp> = ({ title, body, footer }) => {
  
  const { isOpen, content, openModal, closeModal, setContent } = useModal()

  return (
    <div>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={() => openModal()}
      >
        Open Modal
      </button>
      {isOpen && (
        <Modal show={isOpen} onClose={closeModal}>
          <Modal.Header>{title}</Modal.Header>
          <Modal.Body>{body}</Modal.Body>
          <Modal.Footer>
            {footer ? (
              footer
            ) : (
              <button
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                onClick={closeModal}
              >
                Close
              </button>
            )} 
          </Modal.Footer>
        </Modal>
      )}
    </div>
  )
}

export default ModalComponent
