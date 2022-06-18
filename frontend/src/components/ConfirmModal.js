import React from 'react'
import { Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap'

const ConfirmModal = ({ title, confirm, cancel, children, open }) => (
    <Modal isOpen={open}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
            <Button color="secondary" onClick={cancel}>
                Cancel
            </Button>
            <Button color="primary" onClick={confirm}>
                Confirm
            </Button>
        </ModalFooter>
    </Modal>
)

export default ConfirmModal
