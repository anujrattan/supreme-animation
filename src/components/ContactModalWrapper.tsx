"use client";

import { useContactModal } from "@/contexts/ContactModalContext";
import ContactFormModal from "./ContactFormModal";

export default function ContactModalWrapper() {
  const { isOpen, closeModal } = useContactModal();
  return <ContactFormModal isOpen={isOpen} onClose={closeModal} />;
}

