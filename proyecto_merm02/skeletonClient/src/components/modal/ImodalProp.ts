export interface ImodalProp {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  title: string
  body: JSX.Element | string
  footer?: JSX.Element // Opcional, para botones personalizados
}
