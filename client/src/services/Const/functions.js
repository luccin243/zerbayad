import ReactGA from 'react-ga';
import ReactPixel from "react-facebook-pixel";

export default function Event(category, action, label) {
    console.log("Event")
    ReactGA.event({
        category: category,
        action: action,
        label: label
    });
    ReactPixel.fbq('trackCustom', category, {action: action});
}
