/** Global open/close state for the bank-transfer (donate) modal. */
export const useGive = () => {
  const isOpen = useState('give-open', () => false)
  return {
    isOpen,
    open: () => { isOpen.value = true },
    close: () => { isOpen.value = false }
  }
}
