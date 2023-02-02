import React, { useState, useEffect, useId } from 'react';
import { useAppContext } from '../Conext';
import Ntbks from '../content/ntb';

export default function NtbSelect(notebooks) {
  const [ntbs, setNtbs] = useState();
  const [selectedNtb, setSelectedNtb] = useState();
  const ntbSelector = useId();
  const ntbks = notebooks.notebooks;
  const cntx = useAppContext();
  useEffect(() => {
    const test = async () => {
      await ntbks.map(i => console.log(i.displayName))
    }
    //test();
    const list = async () => {
      const li = await ntbks.map(n =>
        <option
          key={n.id}
          value={n.displayName}
        >
          {n.displayName}
        </option>);
      setNtbs(li);
      //console.log(li);
      //console.log(ntbks);
    }
    //console.log(notebooks.notebooks);
    list();
    return () => {

    }
  }, [notebooks]);



  return (
    <lable htmlFor={ntbSelector}>
      <select
        id={ntbSelector}
        title="ntbSelector"
        value={selectedNtb}
        onChange={e => setSelectedNtb(e.target.value)}>
        <option key="0" hidden={true}>Choose</option>
        {ntbs}
      </select>
    </lable>)
}