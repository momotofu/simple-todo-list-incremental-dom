import '../css/main.styl';

import {todos} from './state';
import {renderApp, patchApp} from './view';
import {registerEventHandlers} from './events';
import {getFeatures} from './lib/feature';

const features = getFeatures();

todos.subscribe((newState, change) => patchApp(newState, change))

renderApp(document.body, todos.getState(), features);
registerEventHandlers(features);