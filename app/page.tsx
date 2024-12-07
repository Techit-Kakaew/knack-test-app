"use client"

import { useMemo, useState } from 'react';
import { Avatar, Button, Card, Flex, Select, Space, Typography, Row, Col } from 'antd';
import TimeSlots from '@/app/components/TimeSlots';
import Room from './components/Room';
import { FaRegClock } from '@react-icons/all-files/fa/FaRegClock'
import { IoReloadOutline } from '@react-icons/all-files/io5/IoReloadOutline'

const { Text } = Typography

export interface Appointment {
  patientId: string;
  name: string;
  phone: string;
  time: string;
  service: string;
}

export interface PatientStatus {
  patientId: string;
  name: string;
  statusId: number;
  remainingDays: number;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  phone: string;
  image: string;
  workingHours: string;
  appointments: Appointment[];
  patientStatuses: PatientStatus[];
}

export interface Status {
  id: number;
  name: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "นพ. สมชาย แพทย์ดี",
    specialty: "ทันตกรรมทั่วไป",
    phone: "081-123-4567",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    workingHours: "09:00 - 19:00",
    appointments: [
      { patientId: "6401020", name: "คุณ ภัทรพร ชัยเพชร", phone: "082-123-4567", time: "11:00 - 11:30", service: "ครอบฟัน" },
      { patientId: "6401021", name: "คุณ อนันต์ สุขใจ", phone: "083-123-4567", time: "14:00 - 14:30", service: "ขูดหินปูน" }
    ],
    patientStatuses: [
      {
        patientId: "6401023",
        name: "วรภัทร บารมี",
        statusId: 2,
        remainingDays: 9
      },
      {
        patientId: "6401033",
        name: "ปิยวัฒน์ สมบัติ",
        statusId: 3, 
        remainingDays: 5
      },
      {
        patientId: "6401043",
        name: "สุภาวดี ลี้รัก",
        statusId: 2, 
        remainingDays: 2
      },
      {
        patientId: "6401053",
        name: "การดา สุขสวัสดิ์",
        statusId: 2, 
        remainingDays: 7
      },
      {
        patientId: "6401063",
        name: "ชนกานต์ มณี",
        statusId: 2,
        remainingDays: 3
      },
      {
        patientId: "6401073",
        name: "สมชาย แก้วใส",
        statusId: 2,
        remainingDays: 0
      },
      {
        patientId: "6401009",
        name: "การดา สุขสวัสดิ์",
        statusId: 3,
        remainingDays: 5
      },
    ]
  },
  {
    id: 2,
    name: "พญ. สุดารัตน์ วงศ์แพทย์",
    specialty: "ศัลยกรรมช่องปาก",
    phone: "082-234-5678",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    workingHours: "10:00 - 18:00",
    appointments: [
      { patientId: "6401022", name: "คุณ กิตติพงษ์ พัฒนชัย", phone: "084-123-4567", time: "10:30 - 11:00", service: "ผ่าฟันคุด" },
      { patientId: "6401024", name: "คุณ ปรียาภรณ์ สมสุข", phone: "085-123-4567", time: "15:00 - 15:30", service: "ผ่าตัดเหงือก" }
    ],
    patientStatuses: [
      {
        patientId: "6401034",
        name: "ปิยวัฒน์ สุขสมบัติ",
        statusId: 1,
        remainingDays: 1
      },
      {
        patientId: "6401078",
        name: "สุภาวดี แซ่ลี้",
        statusId: 1,
        remainingDays: 3
      },
    ]
  },
  {
    id: 3,
    name: "นพ. วิทยา สุขสมบูรณ์",
    specialty: "จัดฟัน",
    phone: "083-345-6789",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    workingHours: "08:30 - 17:30",
    appointments: [
      { patientId: "6401025", name: "คุณ มณีรัตน์ ใจดี", phone: "086-123-4567", time: "09:00 - 09:30", service: "ตรวจการจัดฟัน" },
      { patientId: "6401026", name: "คุณ ธนวัฒน์ นานดี", phone: "087-123-4567", time: "16:00 - 16:30", service: "ปรับเครื่องมือจัดฟัน" }
    ],
    patientStatuses: [
      {
        patientId: "6401056",
        name: "สมชาย แก้วใส",
        statusId: 2,
        remainingDays: 1
      },
      {
        patientId: "6401089",
        name: "ชนกานต์ มณี",
        statusId: 1,
        remainingDays: 2
      }
    ]
  }
];

const statuses: Status[] = [
  {
    id: 1,
    name: 'ห้องพิเศษ present',
  },
  {
    id: 2,
    name: 'แอดมิน',
  },
  {
    id: 3,
    name: 'จุดชำระเงิน',
  },
]

const Home = () => {
  const [currentDoctorId, setCurrentDoctorId] = useState<number>(1)

  const doctorOptions = useMemo<Doctor[]>(() => {
    return doctors.map(doctor => ({
      ...doctor,
      value: doctor.id,
      label: doctor.name
    }))
  }, [])

  const currentDoctor = useMemo<Doctor>(() => {
    return doctors.find(doctor => doctor.id === currentDoctorId) as Doctor
  }, [currentDoctorId])
  
  return (
    <Row gutter={32} style={{ width: '100%' }}>
      <Col flex="40%">
        <Space 
          style={{ width: '100%' }} 
          direction="vertical"
        >
          <Select
            style={{ width: '100%' }}
            showSearch
            defaultValue={1}
            placeholder="Select a doctor"
            optionFilterProp="label"
            onChange={setCurrentDoctorId}
            options={doctorOptions}
            optionRender={({ data }) => (
              <Space>
                <Avatar src={data.image} />
                <Text>
                  {data.name}
                </Text>
              </Space>
            )}
          />
          <Card 
            size="small"
            style={{  
              backgroundColor: '#334066'
            }}
          >
            <Flex
              align="center"
              justify="space-between"
            >
              <Text style={{ fontSize: '1.5rem', color: 'white' }}>{currentDoctor?.specialty}</Text>
              <Avatar 
                size={50} 
                src={currentDoctor?.image} 
              />
            </Flex>
          </Card>
        </Space>
        <Card 
          size="small"
          style={{
            backgroundColor: '#ABDBCC',
            border: 'none'
          }}
        >
          <Space 
            style={{ 
              alignItems: 'center',
              justifyContent: 'center', 
              width: '100%' 
            }}
          >
            <FaRegClock size={20} color="white" style={{ verticalAlign: 'middle' }} />
            <Text 
              style={{ 
                fontSize: '1rem',
                color: 'white',
                textAlign: 'center',
              }}
            >
              เวลาเข้างาน {currentDoctor?.workingHours} น.
            </Text>
          </Space>
        </Card>
        <div 
          style={{ 
            maxHeight: 'calc(100vh - 230px)',
            overflowY: 'auto'
          }}
        >
          <TimeSlots currentDoctor={currentDoctor} />
        </div>
      </Col>
      <Col flex="60%" style={{ width: '60%' }}>
        <Flex align="center" justify="space-between">
          <Text style={{ fontSize: '2rem', flex: '1 0 0%' }}>
            วันที่ 30 ม.ค. 2564
          </Text>
          <Flex gap="8px" style={{ flex: '1 0 0%' }}>
            <Flex
              align="center"
              justify="center"
              style={{
                flex: '1 0 0%',
                color: '#E1750F',
                backgroundColor: '#DBE7F3'
              }}
            >
              รายได้ทั้งหมด 0.00 บาท
            </Flex>
            <Button 
              variant="outlined" 
              icon={<IoReloadOutline color="#ED9491" size={18} />} 
              size="middle" 
              style={{
                flex: '0 0 auto',
                borderColor: '#ED9491'
              }}
            />
          </Flex>
        </Flex>
        <Row 
          gutter={8}
          style={{ 
            flexWrap: 'nowrap', 
            overflowX: 'auto' 
          }}
        >
          {statuses.map(status => 
            <Col key={status.id} >
              <Room 
                status={status}
                patientStatuses={currentDoctor?.patientStatuses || []}
              />
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  )
};

export default Home;