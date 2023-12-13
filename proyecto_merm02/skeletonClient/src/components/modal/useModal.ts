import { useState, useCallback } from "react"

interface ModalContent {
  title: string
  body: JSX.Element | string
}

const useModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [content, setContent] = useState<ModalContent>({ title: "", body: "" })

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return { isOpen, content,setIsOpen,  openModal, closeModal,setContent }
}

export default useModal
