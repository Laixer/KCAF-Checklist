import Header from '../components/Header.vue';
import Home from '../components/Home.vue';

const routes = [
    {
        path: '/',
        redirect: '/',
        children: [
            {
                path: '/',
                name: 'Header',
                component: Header
            },
            {
                path: '/',
                name: 'Home',
                component: Home
            },
        ]
    },
    // { path: '*', component: NotFound}
]

export default routes