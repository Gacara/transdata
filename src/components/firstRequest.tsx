import React, { ChangeEvent, useEffect, useState } from 'react'
import { getJSON } from '../callAPI/fetch-json'
import useRefreshablePromise from '../callAPI/use-refreshable-promise'
import Async from '../callAPI/async';
import Search from './search';
import { Grid } from '@material-ui/core';
import { data, stations as stationsInterface } from "../interfaces/utils";


const fetchStations = async (code: string) => {
 return getJSON<data>(`https://api-ratp.pierre-grimaud.fr/v4/stations/metros/${code}`)
}

const fetchMetros = async () => {
  return getJSON<data>("https://api-ratp.pierre-grimaud.fr/v4/lines/metros")
 }

const notifRefresh = async () => {
  console.log("Updated");
  return;
}

function Recherche(): React.ReactElement {
  const [metroStations, setMetroStations] = useState<data<stationsInterface> | null>(null);
  const [metroCode, setMetroCode] = useState<string>("");
  const [metroStation, setMetroStation] = useState<string>("");

  const { refresh: refreshMetros} = useRefreshablePromise(() => fetchMetros(), setMetroStations);
  const { refresh: refreshStations, ...fetchState } = useRefreshablePromise(() => fetchStations(metroCode), setMetroStations);
  const stations = metroStations ? metroStations.result.stations : null;

  const RefreshStationsList = async () => {
    await notifRefresh()
    await refreshStations()
  }

  const RefreshMetrosList = async () => {
    await notifRefresh()
    await refreshMetros()
  }

  function onMetroCodeClick(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>){
    setMetroStation("");
    setMetroCode(event.target.value as string);
  }

  useEffect(()=>{
    if (metroCode !== "")
    {refreshStations()}
  }, [metroCode, refreshStations])

  
  function onMetroStationClick(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>){
    setMetroStation(event.target.value as string)
  }


  return (
    <Grid container item sm={12} justify="center">
        <Grid container item sm={12} justify="center">
        <Search label="metros" list={[{name: "0"}, {name: "1"}, {name: "2"}, {name: "3"}]} value={metroCode} handleChange={onMetroCodeClick}/>
        <Search label="stations" list={stations && stations.length > 0 ? stations : null} value={metroStation} handleChange={onMetroStationClick}/>
        </Grid>
        <Grid container item sm={12} justify="center">
      <Async state={fetchState}>
      {
        !stations  &&
        <>Pas de métro</>
      }
      </Async>
      </Grid>
      <Grid container item sm={12} justify="center">
          <button onClick={RefreshMetrosList}>Refresh metro List</button>
          <button onClick={RefreshStationsList}>Refresh stations List</button>
      </Grid>
    </Grid>
  )
}

export default Recherche;