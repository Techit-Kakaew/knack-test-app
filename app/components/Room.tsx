import React, { useMemo } from "react";
import { Avatar, Card, ConfigProvider, Flex, Space, Typography } from "antd";
import { FaUser } from "@react-icons/all-files/fa/FaUser"
import { FaBan } from "@react-icons/all-files/fa/FaBan"
import { FaShareSquare } from '@react-icons/all-files/fa/FaShareSquare'
import { PatientStatus, Status } from "@/app/page";

const { Text } = Typography

interface Props {
  status: Status;
  patientStatuses: PatientStatus[];
}

const Room: React.FC<Props> = ({ status, patientStatuses }) => {
  const currentPatients = useMemo(() => {
    return patientStatuses.filter(patientStatus => patientStatus.statusId === status.id)
  }, [patientStatuses, status.id])

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: '#57B69B',
          },
        },
      }}
    >
      <Card 
        title={
          <div style={{ color: 'white', textAlign: 'center' }}>{status.name} ( {currentPatients.length} )</div>
        } 
        bordered={false}
        style={{ width: 300 }}
        styles={{
          body: {
            minHeight: 'calc(100vh - 170px)',
            maxHeight: 'calc(100vh - 170px)',
            overflowY: 'auto',
            backgroundColor: status.id === 3 ? '#D6F3D5' : '#DBE7F4'
          }
        }}
      >
        <Flex vertical gap={8}>
          {currentPatients.map((currentPatient, index) =>
            <Card 
              key={currentPatient.patientId}
              styles={{
                body: {
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: 0
                }
              }}
            >
              <Flex 
                justify="space-between" 
                align="flex-start"
              >
                <Space align="start">
                  <Flex vertical>
                    <div 
                      style={{
                        width: 'fit-content',
                        backgroundColor: '#57B69B',
                        color: 'white',
                        padding: '4px 16px',
                        borderRadius: '8px 0 80% 0',
                        fontSize: '.825rem',
                      }}
                    >
                      {index < 10 ? `0${index + 1}` : index}
                    </div>
                    <Avatar 
                      size={50}
                      icon={<FaUser size={50} color="#DBE7F4" />} 
                      style={{ backgroundColor: 'white' }} 
                    />
                  </Flex>
                  <Flex vertical>
                    <Text style={{ fontSize: '1rem', color: '#334166', fontWeight: 'bold' }}>
                      {currentPatient.name}
                    </Text>
                    <Text style={{ fontSize: '1rem', color: '#334166' }}>
                      {currentPatient.patientId}
                    </Text>
                  </Flex>
                </Space>
                <Space 
                  size="middle"
                  direction="vertical"
                  style={{ 
                    alignItems: 'flex-end',
                    padding: '4px' 
                  }}
                >
                  <div
                    style={{
                      backgroundColor: '#334166',
                      color: 'white',
                      padding: '6px 4px',
                      fontSize: '.825rem',
                      borderTopRightRadius: '8px'
                    }}
                  >
                    05
                  </div>
                  <Space>
                    {currentPatient.statusId === 3 &&
                      <FaShareSquare size={18} color="#DBE7F4" cursor="pointer" />
                    }
                    <FaBan size={18} color="#CC444A" cursor="pointer" />
                  </Space>
                </Space>
              </Flex>
              <div style={{ color: '#697178', textAlign: 'center' }}>
                {currentPatient.remainingDays} วัน
              </div>
            </Card>
          )}
        </Flex>
      </Card>
    </ConfigProvider>
  )
}

export default Room