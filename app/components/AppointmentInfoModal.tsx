import { Avatar, Flex, Modal, Space, Typography } from "antd"
import { AppointmentInfo } from "@/app/components/TimeSlots"
import { FaUser } from "@react-icons/all-files/fa/FaUser"
import { FaTooth } from "@react-icons/all-files/fa/FaTooth"
import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt"
import { FaClock } from "@react-icons/all-files/fa/FaClock"
import { MdModeEdit } from "@react-icons/all-files/md/MdModeEdit"
import { IoClose } from '@react-icons/all-files/io5/IoClose'
import DocumentIcon from "../assets/icons/DocumentIcon"

const { Text } = Typography

interface Props {
  currentAppointment: AppointmentInfo
  isModalOpen: boolean;
  onClose(): void
}

const AppointmentInfoModal: React.FC<Props> = ({ currentAppointment, isModalOpen, onClose }) => {
  return (
    <Modal 
      open={isModalOpen} 
      centered
      closable={false}
      footer={null}
      width={400}
      styles={{
        content: {
          position: 'relative',
          padding: 0
        }
      }}
      onCancel={onClose}
    >
      <IoClose 
        color="#5EC5B6" 
        size={30} 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 1,
          cursor: 'pointer'
        }}
        onClick={onClose}
      />
      <Flex 
        align="center"
        justify="space-between"
        style={{
          padding: '8px 24px 0 8px'
        }}
      >
        <Flex vertical>
          <Text style={{ fontSize: '1rem', color: '#5EC5B6', fontWeight: 'bold' }}>
            นัดหมาย
          </Text>
          <Text style={{ fontSize: '1rem', color: '#5EC5B6', fontWeight: 'bold' }}>
            {currentAppointment.specialty} {currentAppointment.name}
          </Text>
        </Flex>
        <Avatar 
          src={currentAppointment.image} 
          size={50}
        />
      </Flex>
      <Flex 
        justify="space-between" 
        align="flex-end"
        style={{
          padding: '4px 16px 0 0'
        }}
      >
        <Flex gap={4}>
          <div 
            style={{
              backgroundColor: '#BCBEC0',
              width: '20px',
              height: 'auto',
              borderTopLeftRadius: '8px',
              borderBottomLeftRadius: '8px'
            }} 
          />
          <Flex vertical>
            <Space>
              <FaUser color="#5EC5B6" />
              <Text>
                {currentAppointment.appointment.patientId} | {currentAppointment.appointment.name}
              </Text>
            </Space>
            <Space>
              <FaTooth color="#5EC5B6" />
              <Text>
                บริการ {currentAppointment.appointment.service}
              </Text>
            </Space>
            <Space>
              <FaPhoneAlt color="#5EC5B6" />
              <Text>
                {currentAppointment.appointment.phone}
              </Text>
            </Space>
            <Text>
              ประเมินค่าใช้จ่าย 0.00
            </Text>
            <Space>
              <FaClock color="#5EC5B6" />
              <Text>
                {currentAppointment.appointment.time}
              </Text>
            </Space>
          </Flex>
        </Flex>
        <Space size="large">
          <DocumentIcon cursor="pointer" />
          <MdModeEdit color="#5EC5B6" size={30} cursor="pointer" />
        </Space>
      </Flex>
    </Modal>
  )
}

export default AppointmentInfoModal