import {
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
  InputLabel,
  Input,
  MenuItem,
  Select,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import format from "date-fns/format";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import { useSaveProfileMutation, useGetResumeProfileQuery} from './services/candidateProfileApi.js';
import Link from '@mui/material/Link';


function App() {
  // Style for Upload Button
  const Input = styled('input')({
    display: 'none',
  });

  //States
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [dob, setDob] = useState(null);
  const [st, setSt] = useState('');
  const [gender, setGender] = useState();
  const [jl, setJl] = useState([]);
  const [pimage, setPimage] = useState('');
  const [rdoc, setRdoc] = useState('');
  const [error, setError] = useState({
    status: false,
    msg: '',
    type: '',
  });

  const[candidates,setCandidates] = useState([]);


  // Multi Checkbox
  const getJl = (e) => {
    let data = jl;
    data.push(e.target.value);
    setJl(data);
  };

  // Clear Form
  const resetForm = () => {
    setName('');
    setEmail('');
    setDob(null);
    setSt('');
    setGender('');
    setJl([]);
    setPimage('');
    setRdoc('');
    document.getElementById('resume-form').reset();
  };

  //RTK  Query
  const [saveProfile] = useSaveProfileMutation();
  const { data,isSuccess } = useGetResumeProfileQuery()
  console.log(data);
  
  useEffect(()=>{
    if(data && isSuccess){
    setCandidates(data.candidates)
  }
 },[data,isSuccess])

  // Handle Form Submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    let data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('dob', dob);
    data.append('st', st);
    data.append('gender', gender);
    data.append('jl', jl);
    data.append('pimage', pimage);
    data.append('rdoc', rdoc);

    
    if (name && email) {
      
      let result= await saveProfile(data);
      console.log(result);

       if (result.data.status === "success") {
        setError({ status: true, msg: "Resume Uploaded Successfully", type: 'success' })
        resetForm()
      }
      if (result.data.status === "failed") {
        setError({ status: true, msg: result.data.message, type: 'error' })
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }


  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        sx={{ backgroundColor: 'green', padding: 2 }}
      >
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: 'bold', color: 'white' }}
        >
          Resume Uploader
        </Typography>
      </Box>
      <Grid container justifyContent="center">
        <Grid item xs={5}>
          <Box
            component="form"
            sx={{ p: 3 }}
            noValidate
            id="resume-form"
            onSubmit={handleSubmit}
          >
            <TextField
              id="name"
              name="name"
              required
              fullWidth
              margin="normal"
              label="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="email"
              name="email"
              required
              fullWidth
              margin="normal"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box mt={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  value={dob}
                  onChange={(newValue) => {
                    setDob(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>

            <Box mt={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="state-select-label"
                  id="state-select"
                  value={st}
                  label="st"
                  onChange={(e) => {
                    setSt(e.target.value);
                  }}
                >
                  <MenuItem value="Bagmati Province">Bagmati Province</MenuItem>
                  <MenuItem value="Gandaki Province">Gandaki Province</MenuItem>
                  <MenuItem value="Lumbini Province">Lumbini Province</MenuItem>
                  <MenuItem value="Karnali Province">Karnali Province</MenuItem>
                  <MenuItem value="Madesh Province">Madesh Province</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <FormLabel id="gender-radio">Gender</FormLabel>
                <RadioGroup row name="gender" aria-labelledby="gender-radio">
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </RadioGroup>
              </FormControl>

              <FormControl component="fieldset" fullWidth margin="normal">
                <FormLabel component="legend">Location:</FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Kathmandu"
                    value="Kathmandu"
                    onChange={(e) => getJl(e)}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Pokhara"
                    value="Pokhara"
                    onChange={(e) => getJl(e)}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Chitwan"
                    value="Chitwan"
                    onChange={(e) => getJl(e)}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Biratnagar"
                    value="Biratnagar"
                    onChange={(e) => getJl(e)}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Birgunj"
                    value="Birgunj"
                    onChange={(e) => getJl(e)}
                  />
                </FormGroup>
              </FormControl>

              <Stack direction="row" alignItems="center" spacing={4}>
                <label htmlFor="profile-photo">
                  <Input
                    accept="image/*"
                    id="profile-photo"
                    type="file"
                    onChange={(e) => {
                      setPimage(e.target.files[0]);
                    }}
                  />
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                </label>
                <label htmlFor="resume-file">
                  <Input
                    accept="doc/*"
                    id="resume-file"
                    type="file"
                    onChange={(e) => {
                      setRdoc(e.target.files[0]);
                    }}
                  />
                  <Button variant="contained" component="span">
                    Upload File
                  </Button>
                </label>
              </Stack>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, px: 5 }}
                color="error"
              >
                Submit
              </Button>
              {error.status ? (
                <Alert severity={error.type}>{error.msg}</Alert>
              ) : (
                ''
              )}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={7}>
          <Box
            display="flex"
            justifyContent="center"
            sx={{ backgroundColor: 'info.light', padding: 1 }}
          >
            <Typography
              varient="h5"
              component="div"
              sx={{ fontWeight: 'bold', color: 'white' }}
            >
              List of Candidates
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead >
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: 600}}>Name</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600}}>Email</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600}}>DOB</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600}}>State</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600}}>Gender</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600}}>Location</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600}}>Avatar</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600}}>Rdoc</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates.map((candidate,i)=>{
                  return (
                    <TableRow key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{candidate.name}</TableCell>
                  <TableCell align="center">{candidate.email}</TableCell>
                  <TableCell align="center">{format(new Date(candidate.dob), 'dd-MM-yyyy')}</TableCell>                  
                  <TableCell align="center">{candidate.state}</TableCell>
                  <TableCell align="center">{candidate.gender}</TableCell>
                  <TableCell align="center">{candidate.location}</TableCell>
                  <TableCell align="center">
                    <Avatar src={`http://localhost:3000/${candidate.pimage}`} />
                  </TableCell>
                  <TableCell align='center'><Link href={`http://localhost:3000/${candidate.rdoc}`}>Download</Link></TableCell>
                </TableRow>
                  )
                })
                }
                
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
