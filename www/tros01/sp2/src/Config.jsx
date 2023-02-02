import { useState, useCallback } from "react";

export default function Config(){
    const [cID, setCID] = useState('');
    const [aID, setAID] = useState('');

    return (
        <>
        <br/><ClientIdForm />
        <br/><AuthorityIdForm />
        <button onClick={() => console.log(getFromLocal('cId'))}>L</button><br/>
        zde bude za nedlouho možno nakonfigurovat parametry pro autentizaci k MS Graph API
        </>
    )
}

function ClientIdForm() {
    const [clientId, setClientId] = useState('');
    const saveCID = useCallback(() => {
        save2local('cId',clientId);
    });
    const logt = () => console.log("ccccccccccc");
    return (
      <label>
      clientID
      <form onSubmit={saveCID}>
        <input value={clientId} onChange={e => setClientId(e.target.value)} />
        <button type="submit" >S</button>
      </form>
      
      <button onClick={logt}>cc</button>
      </label>
    );
  }

function AuthorityIdForm() {
    const [authorityId, setAuthorityId] = useState('');
    const saveAID = useCallback(() => {
        save2local('aId',authorityId);
    });

    return (
      <label>
        authorityId
      <form onSubmit={saveAID}>
        <input value={authorityId} onChange={e => setAuthorityId(e.target.value)} />
        <button type="submit" >S</button>
      </form>
      
      </label>
    );
  }

function save2local(k,v){
    
    localStorage.setItem(JSON.stringify(k),JSON.stringify(v));
    console.log(JSON.stringify(k),JSON.stringify(v))
}

function getFromLocal(k){
    console.log(Storage.key(0))
    return (localStorage.getItem(k))
}