import './index.css'

const MedicineCard = ({medicine}) => {
  const {name, dosage, time} = medicine

  return (
    <div className="medicine-card">
      <h3>{name}</h3>

      <p>Dosage: {dosage}</p>

      <p>Time: {time}</p>
    </div>
  )
}

export default MedicineCard