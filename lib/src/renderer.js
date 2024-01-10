import { createApp } from 'vue'
// import './style.css'

function render(component) {
    const app = createApp(component)
    if (component.customOptions?.initApp) {
        component.customOptions?.initApp(app)
    }

    app.mount('#app')
}

// if (import.meta.hot) {
//     import.meta.hot.send('v-shot:from-client', { msg: 'Hey!' })
// }
