import { useCallback, useMemo, useState } from "react"
import { Card, Flex, Typography } from "antd"
import { Appointment, Doctor } from "@/app/page";
import AppointmentInfoModal from "./AppointmentInfoModal";

const { Text } = Typography

export interface AppointmentInfo extends Pick<Doctor, "name" | "image" | "specialty"> {
  appointment: Appointment
}

interface Props {
  currentDoctor: Doctor;
}

const TimeSlots: React.FC<Props> = ({ currentDoctor }) => {
  const { workingHours, appointments } = currentDoctor

  const [currentAppointment, setCurrentAppointment] = useState<AppointmentInfo | null>(null)
  
  const [isAppointmentInfoModalOpen, setIsAppointmentInfoModalOpen] = useState(false)

  const onAppointmentInfoModalClose = () => {
    setIsAppointmentInfoModalOpen(false)
  }

  const calculateDuration = (timeRange: string): number => {
    const [start, end] = timeRange.split(' - ');
    
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
  
    const startInMinutes = startHours * 60 + startMinutes;
    const endInMinutes = endHours * 60 + endMinutes;
  
    return endInMinutes - startInMinutes;
  }

  const generateTimeSlots = (startTime: string, endTime: string, interval = 15) => {
    const times = [];
    const current = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
  
    while (current <= end) {
      const formattedTime = current.toTimeString().slice(0, 5);
      times.push(formattedTime);
      current.setMinutes(current.getMinutes() + interval);
    }
    return times;
  }

  const timeSlots = useMemo(() => {
    if(!workingHours) return []

    const [start, end] = workingHours.split(' - ')
    return generateTimeSlots(start, end)
  }, [workingHours])

  const calculateTop = useCallback((appointmentTime: string) => {
    const startTime = appointmentTime.split(' - ')[0]
    const timeSlotIndex = timeSlots.findIndex(timeSlot => timeSlot === startTime)
    return 50 * timeSlotIndex
  }, [timeSlots])

  const handleOpenAppointmentInfoModal = useCallback((appointment: Appointment) => {
    setCurrentAppointment({
      name: currentDoctor.name,
      specialty: currentDoctor.specialty,
      image: currentDoctor.image,
      appointment,
    })

    setIsAppointmentInfoModalOpen(true)
  }, [currentDoctor.image, currentDoctor.name, currentDoctor.specialty])
  
  return (
    <div style={{ position: 'relative' }}>
      {appointments.map((appointment) => 
        <Card 
          key={appointment.patientId}
          style={{ 
            position: 'absolute', 
            top: `${calculateTop(appointment.time)}px`, 
            left: '66px',
            width: 'calc(100% - 90px)',
            cursor: 'pointer',
          }}
          styles={{
            body: {
              backgroundColor: '#F2F5F9',
              height: `${(calculateDuration(appointment.time) / 15) * 50}px`,
              padding: '0 0 0 24px',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)'
            }
          }}
          onClick={() => handleOpenAppointmentInfoModal(appointment)}
        > 
          <div 
            style={{ 
              backgroundColor: '#F09E39', 
              height: '100%', 
              borderTopRightRadius: '8px', 
              borderBottomRightRadius: '8px',
              paddingLeft: '4px'
            }}>
            {appointment.name} | {appointment.service} | {appointment.patientId}<br />{appointment.phone} | {appointment.time} น.
          </div>
        </Card>
      )}
      {timeSlots.map((timeSlot, index) => (
        <Flex 
          key={timeSlot}
          gap="middle"
          style={{ width: '100%' }}
        >
          <Text 
            style={{ 
              minWidth: '50px',
              fontWeight: timeSlot.split(':')[1] === '00' ? 'bold' : 'normal',
              backgroundColor: index % 2 !== 0 ? '#F7F7F7' : 'white',
              padding: '8px'
            }}
          >
            {timeSlot}
            </Text>
          <div
            style={{ 
              flex: '1 0 0%',
              height: '50px',
              backgroundColor: index % 2 !== 0 ? '#F7F7F7' : 'white'
            }} 
          />
        </Flex>
      ))}
      {currentAppointment &&
        <AppointmentInfoModal 
          currentAppointment={currentAppointment}
          isModalOpen={isAppointmentInfoModalOpen}
          onClose={onAppointmentInfoModalClose}
        />
      }
    </div>
  )
}

export default TimeSlots