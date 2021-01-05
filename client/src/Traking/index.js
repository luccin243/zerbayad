import ReactGA from 'react-ga';


export const initGA = () => {
    ReactGA.initialize("UA-141866567-1");
}

export const PageView = () => {
    ReactGA.pageview(window.location.pathname +
        window.location.search);
}

