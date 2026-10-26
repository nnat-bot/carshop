import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, themeMaterial } from 'ag-grid-community';
import type { ColDef, ICellRendererParams } from 'ag-grid-community';
import { Button, Snackbar, Stack, TextField } from '@mui/material';
import { addCar, deleteCar, getCars, updateCar } from '../carapi';
import type { Car, CarData } from '../types';
import CarDialog from './CarDialog';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Carlist() {
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const fetchCars = () => {
    getCars().then(setCars).catch(err => console.error(err));
  };

  useEffect(() => {
    getCars().then(setCars).catch(err => console.error(err));
  }, []);

  const handleAdd = (car: CarData) => {
    addCar(car)
      .then(() => { fetchCars(); setMessage('Car added'); })
      .catch(err => { console.error(err); setMessage('Something went wrong'); });
  };

  const handleUpdate = (url: string, car: CarData) => {
    updateCar(url, car)
      .then(() => { fetchCars(); setMessage('Car updated'); })
      .catch(err => { console.error(err); setMessage('Something went wrong'); });
  };

  const handleDelete = (url: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      deleteCar(url)
        .then(() => { fetchCars(); setMessage('Car deleted'); })
        .catch(err => { console.error(err); setMessage('Something went wrong'); });
    }
  };

  const columnDefs: ColDef<Car>[] = [
    { field: 'brand' },
    { field: 'model' },
    { field: 'color' },
    { field: 'fuel' },
    { field: 'modelYear', headerName: 'Year', filter: 'agNumberColumnFilter' },
    { field: 'price', filter: 'agNumberColumnFilter' },
    {
      headerName: '',
      sortable: false,
      filter: false,
      maxWidth: 110,
      cellRenderer: (params: ICellRendererParams<Car>) =>
        params.data && (
          <CarDialog
            title="Edit Car"
            buttonText="Edit"
            initialCar={params.data}
            onSave={car => handleUpdate(params.data!._links.self.href, car)}
          />
        ),
    },
    {
      headerName: '',
      sortable: false,
      filter: false,
      maxWidth: 110,
      cellRenderer: (params: ICellRendererParams<Car>) =>
        params.data && (
          <Button
            size="small"
            color="error"
            onClick={() => handleDelete(params.data!._links.self.href)}
          >
            Delete
          </Button>
        ),
    },
  ];

  const defaultColDef: ColDef<Car> = {
    flex: 1,
    minWidth: 110,
    sortable: true,
    filter: true,
    floatingFilter: true,
  };

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ my: 2 }}>
        <CarDialog title="New Car" buttonText="Add Car" onSave={handleAdd} />
        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </Stack>

      <div style={{ height: 600, width: '100%' }}>
        <AgGridReact<Car>
          rowData={cars}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 20, 50]}
          quickFilterText={search}
          theme={themeMaterial}
        />
      </div>

      <Snackbar
        open={message !== ''}
        autoHideDuration={3000}
        onClose={() => setMessage('')}
        message={message}
      />
    </>
  );
}