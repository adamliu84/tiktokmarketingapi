import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
const axios = require('axios');

const AdgroupTable = (props) => {
  const { ads } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Ad ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Format</TableCell>
            <TableCell align="right">Display Name</TableCell>
            <TableCell align="right">Create Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ads.map((row) => (
            <TableRow
              key={row.ad_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ad_id}
              </TableCell>
              <TableCell align="right">{row.ad_name}</TableCell>
              <TableCell align="right">{row.format}</TableCell>
              <TableCell align="right">{row.display_name}</TableCell>
              <TableCell align="right">{row.create_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default function AdgroupContent(props) {

  const { adgroupId } = props
  const [ads, setAds] = useState(null);

  useEffect(() => {
    axios.get("/api/barebone/ad", { params: { adgroupId: adgroupId } }
    ).then(function (response) {
      console.log(response.data);
      setAds(response.data);
    }).catch(function (error) {
      console.error(error);
    })
  }, [adgroupId]);

  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container>
            <Grid item xs={8}>
              <Typography mt={2} variant="h6">
                Ad of {adgroupId}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" sx={{ mr: 1 }}>
                Add Ad
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {(null === ads || ads.length <= 0) ? (
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          No Ad Group created
        </Typography>
      ) : (
        <AdgroupTable ads={ads} {...props} />
      )
      }
    </Paper >
  );
}