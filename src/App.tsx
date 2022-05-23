import React from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { useMachine } from '@xstate/react'
import { createMachine } from 'xstate'
import MachineConf from './machine.json'

const MachineContext = React.createContext<any>(null);

function App() {
    const AuthMachine = createMachine(
        // @ts-ignore: this works, trust me
        MachineConf
    );

    const [state, send] = useMachine(AuthMachine);
    const Screen = React.useMemo(() => MachineScreenMap[state.value.toString()], [state])

    return (
        <div className="App">
            <AnimatePresence exitBeforeEnter>
                <MachineContext.Provider value={send}>
                    <Screen />
                </MachineContext.Provider>
            </AnimatePresence>
        </div>
    )
}

const MachineScreenMap : { [key : string] : React.FC } = {
    'Start': Start,
    'Login': Login,
    'Things': Things,
    'Register': Register,
    'Captcha': Captcha,
    'RecoveryPhrase': RecoveryPhrase,
    'End': End,
};

function Start () {
    const send = React.useContext(MachineContext);
    return <PageTransition>
        <h1>Start</h1>
        <button onClick={() => send('User clicks login with anchor')}>Login with anchor</button>
        <button onClick={() => send('User clicks register')}>Register</button>
    </PageTransition>
}

function Login () {
    const send = React.useContext(MachineContext);
    return <PageTransition>
        <h1>Login</h1>
        <button onClick={() => send('Things happen')}>Things happen</button>
        <button onClick={() => send('User clicks back')}>Back</button>
    </PageTransition>
}

function Things () {
    const send = React.useContext(MachineContext);
    return <PageTransition>
        <h1>Things</h1>
        <button onClick={() => send('Things happen')}>Things happen</button>
    </PageTransition>
}

function Register () {
    const send = React.useContext(MachineContext);
    return <PageTransition>
        <h1>Register</h1>
        <button onClick={() => send('User clicks create with this device')}>Create with this device</button>
    </PageTransition>
}

function Captcha () {
    const send = React.useContext(MachineContext);
    return <PageTransition>
        <h1>Captcha</h1>
        <button onClick={() => send('Things happen')}>Things happen</button>
        <button onClick={() => send('User doesn\'t wants things to happend')}>No things, thanks</button>
    </PageTransition>
}

function RecoveryPhrase () {
    const send = React.useContext(MachineContext);
    return <PageTransition>
        <h1>Recovery Phrase</h1>
        <button onClick={() => send('Things happen')}>Things happen</button>
    </PageTransition>
}

function End () {
    const send = React.useContext(MachineContext);
    return <PageTransition>
        <h1>End</h1>
        <p>This is where we return the delegate and shut 'er down</p>
    </PageTransition>
}

function PageTransition ({ children } : { children : React.ReactNode }) {
    return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{children}</motion.div>
}

export default App
