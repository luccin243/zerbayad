import React from 'react';
import './App.css';
import Routes from './routes';
import HttpsRedirect from 'react-https-redirect';

class App extends React.Component {

    render() {
        return (
            <HttpsRedirect>
                <div className="App">
                    <Routes/>
                </div>
            </HttpsRedirect>
        )
    }
}

export default App;

// "start": "serve -s build",


