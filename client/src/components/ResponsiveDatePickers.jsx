
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
function ResponsiveDatePickers({ label, todayDate, setDate }) {

  const handelChange = (date) => {
    setDate(new Date(date.$d).toLocaleString().split(",")[0])
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DatePicker
        label={label}
        defaultValue={dayjs(todayDate)}
        minDate={dayjs(todayDate)}
        onChange={handelChange}
        
      />
    </LocalizationProvider>
  );
}

export default ResponsiveDatePickers
