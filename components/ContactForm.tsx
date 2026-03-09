'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

import Input from './Input';
import Select from './Select';
import { AppButton } from './AppButton';
import { FormsModal } from './FormsModal';
import {
  contactSchema,
  ContactFormData,
} from '@/lib/validators/contact.schema';
import { email } from 'zod';  

const ContactForm = () => {
  const t = useTranslations('Contact.form');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
  }>({
    isOpen: false,
    type: 'success',
  });


  // Get form field data from translations
  const formFields = {
    name: {
      label: t('fields.name.label'),
      placeholder: t('fields.name.placeholder'),
    },
    company: {
      label: t('fields.company.label'),
      placeholder: t('fields.company.placeholder'),
    },
    email: {
      label: t('fields.email.label'),
      placeholder: t('fields.email.placeholder'),
    },
    phone: {
      label: t('fields.phone.label'),
      placeholder: t('fields.phone.placeholder'),
    },
    businessType: {
      label: t('fields.businessType.label'),
      options: t.raw('fields.businessType.options') as Array<{ label: string; value: string }>,
    },
    message: {
      label: t('fields.message.label'),
      placeholder: t('fields.message.placeholder'),
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      reset();
      setModalState({ isOpen: true, type: 'success' });
      // setTimeout(() => setModalState({ isOpen: false, type: 'success' }), 5000);
    } else {
      setModalState({ isOpen: true, type: 'error' });
      // setTimeout(() => setModalState({ isOpen: false, type: 'error' }), 5000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-end gap-2 w-full"
    >
      <div className="flex flex-col items-center md:items-end gap-2 w-full">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Input
            label={formFields.name.label}
            placeholder={formFields.name.placeholder}
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label={formFields.email.label}
            placeholder={formFields.email.placeholder}
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <Input
            label={formFields.company.label}
            placeholder={formFields.company.placeholder}
            {...register('company')}
            error={errors.company?.message}
          />
          <Select
            label={formFields.businessType.label}
            options={formFields.businessType.options}
            {...register('businessType')}
            error={errors.businessType?.message}
          />
        </div>

          <Input
            label={formFields.phone.label}
            placeholder={formFields.phone.placeholder}
            {...register('phone')}
            error={errors.phone?.message}
          />

          <Input
            variant="textarea"
            rows={5}
            label={formFields.message.label}
            placeholder={formFields.message.placeholder}
            {...register('message')}
            error={errors.message?.message}
          />
      </div>  

      <AppButton
        type="submit"
        leftIcon={<Users size={20} />}
        disabled={isSubmitting}
        className='mt-6'
      >
        {t('submitButton.label')}
      </AppButton>

      <FormsModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        type={modalState.type}
      />
    </form>
  );
};

export default ContactForm;
