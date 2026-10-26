import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import type { CarData } from '../types';

type FormState = Record<keyof CarData, string>;

const emptyForm: FormState = { brand: '', model: '', color: '', fuel: '', modelYear: '', price: '' };

const fields: { name: keyof CarData; label: string; type?: string }[] = [
  { name: 'brand', label: 'Brand' },
  { name: 'model', label: 'Model' },
  { name: 'color', label: 'Color' },
  { name: 'fuel', label: 'Fuel' },
  { name: 'modelYear', label: 'Year', type: 'number' },
  { name: 'price', label: 'Price', type: 'number' },
];

type CarDialogProps = {
  title: string;
  buttonText: string;
  initialCar?: CarData;
  onSave: (car: CarData) => void;
};

export default function CarDialog({ title, buttonText, initialCar, onSave }: CarDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);

  const handleOpen = () => {
    if (initialCar) {
      setForm({
        brand: initialCar.brand,
        model: initialCar.model,
        color: initialCar.color,
        fuel: initialCar.fuel,
        modelYear: String(initialCar.modelYear),
        price: String(initialCar.price),
      });
    } else {
      setForm(emptyForm);
    }
    setOpen(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (Object.values(form).some(value => value.trim() === '')) {
      alert('Please fill in all fields');
      return;
    }
    onSave({ ...form, modelYear: Number(form.modelYear), price: Number(form.price) });
    setOpen(false);
  };

  return (
    <>
      <Button size="small" variant={initialCar ? 'text' : 'outlined'} onClick={handleOpen}>
        {buttonText}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {fields.map(f => (
            <TextField
              key={f.name}
              name={f.name}
              label={f.label}
              type={f.type ?? 'text'}
              value={form[f.name]}
              onChange={handleChange}
              margin="dense"
              variant="standard"
              fullWidth
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}