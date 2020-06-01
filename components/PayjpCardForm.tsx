import { useEffect, useState, useCallback } from 'react'
import { Button, Alert, Card, Space } from 'antd'
import * as Payjp from 'payjp'
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

  const [token, setToken] = useState<string | null>(null)
  const [tokenGenerationError, setTokenGenerationError] = useState<Payjp.ResponseError | Error | null>(null)

  const handleClick = useCallback((event: MouseEvent) => {
    setToken(null)
    setTokenGenerationError(null)
    const cardElement = elements.getElement('cardNumber')
    payjp.createToken(cardElement)
      .then((response: any) => {
        if (response.error) {
          console.error(response)
          const error = response.error as Payjp.ResponseError
          setTokenGenerationError(error)
          return
        }
        const token = response as Payjp.Token
        setToken(token.id)
      })
      .catch((error: Error) => {
        console.error(error)
        setTokenGenerationError(error)
      })
    event.preventDefault()
  }, [payjp, elements])

  return (
    <>
      <Card>
        <Space direction="vertical">
          <div id="number-form" />
          <div id="expiry-form" />
          <div id="cvc-form" />
          <Button
            type="primary"
            onClick={handleClick}
          >
            トークンを作成する
          </Button>
          {tokenGenerationError &&
            <Alert
              message="エラー"
              description={tokenGenerationError.message}
              type="error"
              showIcon
            />
          }
          {token &&
            <Alert message={`トークン: ${token}`} type="success" showIcon />
          }
        </Space>
      </Card>
    </>
  )
}

export default PayjpCardForm
