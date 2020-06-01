import { useEffect, useState } from 'react'
import { usePayjp } from '@/services/PayjpJs'

const PayjpCardForm: React.FC = () => {

  const payjp = usePayjp()

  const [elements, setElements] = useState<any>(null)

  useEffect(() => {
    if (payjp) {
      const elements = payjp.elements()
      elements.create('cardNumber').mount('#number-form')
      elements.create('cardExpiry').mount('#expiry-form')
      elements.create('cardCvc').mount('#cvc-form')
      setElements(elements)
    }
  }, [payjp])

  const [token, setToken] = useState('トークンを作成するとここに表示されます。')

  return (
    <>
      <div id="number-form" />
      <div id="expiry-form" />
      <div id="cvc-form" />
      <button
        onClick={event => {
          payjp.createToken(elements.getElement('cardNumber')).then(r => {
            setToken(r.error ? r.error.message : r.id)
          })
          event.preventDefault()
        }}
      >
        トークンを作成する
      </button>
      <div>{token}</div>
    </>
  )
}

export default PayjpCardForm
