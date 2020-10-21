import React, { ChangeEvent, useEffect, useState } from 'react'
import { getJSON } from '../callAPI/fetch-json'
import useRefreshablePromise from '../callAPI/use-refreshable-promise'
import Async from '../callAPI/async';
import Search from './search';
import {listInterface} from "./search";
import { Grid } from '@material-ui/core';
import { data, metros as metrosInterface, stations as stationsInterface } from "../interfaces/utils";


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
  const [metroCodes, setMetroCodes] = useState<data<metrosInterface> | null>(null);
  const [metroCodeDepart, setMetroCodeDepart] = useState<string>("");
  const [metroStationDepart, setMetroStationDepart] = useState<string>("");
 // const [metroCodeArrivee, setMetroCodeArrivee] = useState<string>("");
  const [metroStationArrivee, setMetroStationArrivee] = useState<string>("");

  const { refresh: refreshMetros} = useRefreshablePromise(() => fetchMetros(), setMetroCodes);
  const { refresh: refreshStations, ...fetchState } = useRefreshablePromise(() => fetchStations(metroCodeDepart), setMetroStations);
  const stationsDepart: listInterface[] | null = metroStations && metroStations.result.stations ? metroStations.result.stations.map(({name, slug: value}) => {return {name, value}}) : null;
  const metrosDepart: listInterface[] | null = metroCodes ? metroCodes.result.metros.map(({name, code: value}) => {return {name, value}}) : null;
  const stationsArrivee: listInterface[] | null = metroStations && metroStations.result.stations ? metroStations.result.stations.map(({name, slug: value}) => {return {name, value}}) : null;
  //const metrosArrivee: listInterface[] | null = metroCodes ? metroCodes.result.metros.map(({name, code: value}) => {return {name, value}}) : null;

  const RefreshStationsList = async () => {
    await notifRefresh()
    await refreshStations()
  }

  const RefreshMetrosList = async () => {
    await notifRefresh()
    await refreshMetros()
  }

  function onMetroCodeClick(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>){
    setMetroStationDepart("");
    setMetroCodeDepart(event.target.value as string);
  }

 useEffect(()=>{
    if (metroCodeDepart !== "")
    {refreshStations()}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metroCodeDepart])

  function onMetroStationDepartClick(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>){
    setMetroStationDepart(event.target.value as string)
  }

  function onMetroStationArriveeClick(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>){
    setMetroStationArrivee(event.target.value as string)
  }

  return (
    <Grid style={{ height: "100vh" }} container item sm={12} justify="center" alignItems="flex-start">
        <Grid container item sm={12} justify="center" style={{ padding: "20vh 0 2vh 0"}}>
        <Grid container item sm={12} justify="center">
          DEPART
        </Grid>
        <Grid container item sm={12} justify="center">
        <Search label="metros" list={metrosDepart} value={metroCodeDepart} handleChange={onMetroCodeClick}/>
        {
          stationsDepart &&
          <Search label="stations" list={stationsDepart} value={metroStationDepart} handleChange={onMetroStationDepartClick}/>
        }
        </Grid>
        </Grid>
        <Grid container item sm={12} justify="center">
        <Grid container item sm={12} justify="center">
          ARRIVEE
        </Grid>
        <Grid container item sm={12} justify="center">
        <Search label="metros" list={metrosDepart} value={metroCodeDepart} handleChange={onMetroCodeClick}/>
        {
          stationsArrivee &&
          <Search label="stations" list={stationsArrivee} value={metroStationArrivee} handleChange={onMetroStationArriveeClick}/>
        }
        </Grid>
        </Grid>
        <Grid container item sm={12} justify="center">
      <Async state={fetchState}>
      {
        !stationsDepart  && !stationsArrivee &&
        <>Veuillez selectionner une station de metro de départ et d'arriver</>
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