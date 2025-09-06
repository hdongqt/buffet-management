import { ReservationForm } from '@/components/common'
import { Reservation } from './styled'

const ReservationPage = () => {
  return (
    <section>
      <Reservation.HeroSection />
      <ReservationForm />
    </section>
  )
}

export default ReservationPage
