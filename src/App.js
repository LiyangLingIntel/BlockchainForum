import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import {ShareManager} from './sharing'
import {bigIntToBuffer, bufferToBigInt} from './utils'
import bigInt from 'big-integer'

import { load } from 'protobufjs' // respectively "./node_modules/protobufjs"
import {BlockData} from './blockchain/protos/objects'
import { Block } from './blockchain'


class App extends Component {

    connect() {
        let addr = document.getElementById('peerAddr').value
        let port = document.getElementById('peerPort').value
        let sm = new ShareManager()
        sm.connect(addr, port)
    }

    render() {
        
        return (
            <div className="App">
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <h1 className="App-title">Blockchain Test</h1>
                </header>
                <div id="data_input">
                    <input id="peerAddr" type="text" defaultValue="chain.infnote.com"/>
                    <input id="peerPort" type="text" defaultValue="32767"/>
                    <button id="btnConnect" onClick={this.connect}>create</button>
                    <br />
                    <p>p2p testing</p>
                    <p>option + command + i to check local storage</p>
                </div>
            </div>
        )
    }
}


export default App
