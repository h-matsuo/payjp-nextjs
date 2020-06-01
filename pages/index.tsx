import Head from 'next/head'
import PayjpCardForm from '@/components/PayjpCardForm'

export default function Home() {
  return (
    <>
      <Head>
        <title>カード情報の入力</title>
      </Head>
      <PayjpCardForm />
    </>
  )
}
