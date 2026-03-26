import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ActionButton from './ActionButton';
import { SERVICES } from '../lib/constants';
import { getFriendlyErrorMessage } from '../lib/errors';
import { supabase } from '../lib/supabase';

const initialValues = {
  name: '',
  phone: '',
  service: SERVICES[0].value,
};

function BookingForm({ onBooked }) {
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    const payload = {
      customer_name: values.name.trim(),
      customer_phone: values.phone.trim(),
      customer_service: values.service,
    };

    const { data, error } = await supabase.rpc('create_token', payload);

    if (error || !data?.[0]) {
      const friendlyError = getFriendlyErrorMessage(error, 'Unable to create token right now.');
      setSubmitError(friendlyError);
      toast.error(friendlyError);
      setSubmitting(false);
      return;
    }

    toast.success(`Token ${data[0].token_number} booked successfully`);
    setValues(initialValues);
    onBooked(data[0]);
    setSubmitting(false);
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[32px] border border-sky-100 bg-panel/90 p-6 shadow-glow sm:p-8"
    >
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Your name</span>
          <input
            required
            value={values.name}
            onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))}
            className="rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-gold-300"
            placeholder="Enter your full name"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Phone number</span>
          <input
            required
            pattern="[0-9]{10}"
            title="Enter a 10 digit phone number"
            value={values.phone}
            onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value.replace(/\D/g, '').slice(0, 10) }))}
            className="rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-gold-300"
            placeholder="10 digit mobile number"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Select service</span>
          <select
            value={values.service}
            onChange={(event) => setValues((current) => ({ ...current, service: event.target.value }))}
            className="rounded-2xl border border-sky-100 bg-sky-50/80 px-4 py-3 text-slate-900 outline-none transition focus:border-gold-300"
          >
            {SERVICES.map((service) => (
              <option key={service.value} value={service.value} className="bg-white text-slate-900">
                {service.value}
              </option>
            ))}
          </select>
        </label>

        <ActionButton
          type="submit"
          disabled={submitting}
          className="mt-2 bg-gold-500 text-white hover:bg-gold-400"
        >
          {submitting ? 'Booking your turn...' : 'Book Your Turn'}
        </ActionButton>

        {submitError ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {submitError}
          </div>
        ) : null}
      </div>
    </motion.form>
  );
}

export default BookingForm;
