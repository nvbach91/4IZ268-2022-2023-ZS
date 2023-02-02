import { useState, useEffect, useId } from "react";

import Ntbks from "./ntb";

import { useAppContext } from '../Conext';
import  NtbSelect  from '../navigace/NtbSelect'
function PagesView() {
  const cntx = useAppContext();
  const ntbs = cntx.notebooks;
  return (
    <div>
      <p>pagesView</p>
      <Ntbks />
      
    </div>)
}

export default PagesView;

/* function SelectNtb() {
  return (
    <select>
      <option value="someOption">Some option</option>
      <option value="otherOption">Other option</option>
    </select>)
}

async function NtbList() {

  const cntx = useAppContext();


  const ejj = async (cntx) => {
    console.log(cntx);
    const ntbl = cntx.notebooks.map(ntb => <option>{ntb.displayName}</option>);
    return (ntbl);
  };
  //const ntbl =  await cntx.notebooks.map(ntb => <option>{ntb.displayName}</option>);
  return (
    <NtbOption cntx={cntx} />
  )
}

function NtbOption(cntx) {
  return (
    <>
      {cntx.notebooks.map(
        function (props) {
          const ntbName = props.displayName;
          return (
            <tr >

              <td>
                <div >{ntbName}</div>

              </td>
            </tr>
          )
        }
      )}
    </>);
}

function NtbOpt1(dName) {
  return <option>{dName}</option>
} */

