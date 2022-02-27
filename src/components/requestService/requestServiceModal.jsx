import { Button, Modal } from 'antd'
import { useState } from 'react';

export const RequestServiceModal = () => {
   const [visible, setVisible] = useState(false) 

  const showModal = () => {
    setVisible(true)
  };

  const handleOk = e => {
    console.log(e);
    setVisible(false)
  };

  const handleCancel = e => {
    console.log(e);
    setVisible(false)
  };
    return(
        <div>
            
            <Modal
            title="Basic Modal"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ disabled: false }}
            cancelButtonProps={{ disabled: false }}
            >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            </Modal>
        </div>
        
    )
}