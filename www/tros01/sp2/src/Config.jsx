import { useState, useCallback } from "react";

export default function Config(){
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
    const getCID = useCallback((CID) => {
        return clientId;
    })
    return (
      <label>
      clientID
      <form onSubmit={save2local('cId',clientId)}>
        <input value={clientId} onChange={e => setClientId(e.target.value)} />
        <button type="submit" >S</button>
      </form>
      
      <button onClick={console.log(getCID())}>cc</button>
      </label>
    );
  }

function AuthorityIdForm() {
    const [authorityId, setAuthorityId] = useState('');
    return (
      <label>
        authorityId
      <form>
        <input value={authorityId} onChange={e => setAuthorityId(e.target.value)} />
      </form>
      <button onClick={save2local('aId',authorityId)}>S</button>
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