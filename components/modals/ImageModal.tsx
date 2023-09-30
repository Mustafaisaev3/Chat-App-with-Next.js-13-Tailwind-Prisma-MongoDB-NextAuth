'use client';

import axios from 'axios';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm 
} from 'react-hook-form';
import { User } from '@prisma/client';

import Input from "@/components/UI/Input";
import Select from '@/components/UI/Select';
import Modal from './Modal';
import Button from '@/components/UI/Button';
import { toast } from 'react-hot-toast';

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const ImageModal: React.FC<ImageModalProps> = ({ 
  isOpen, 
  onClose, 
  currentUser
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: []
    }
  });

  const members = watch('members');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
  
    axios.post('/api/conversations', {
      ...data,
      isGroup: true
    })
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false));
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isDark={true}>
      
    </Modal>
  )
}

export default ImageModal;